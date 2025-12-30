import { reactive, computed } from 'vue'
import { Notify } from 'quasar'
import { useSound } from 'src/composables/useSound'

const { play } = useSound()

const BASE_GROW_TIME = 10000
const MAX_LANDS = 15
const BASE_LAND_PRICE = 3
const BASE_PERK_PRICE = 1
const MAX_PERKS = 3

const state = reactive({
  growTime: BASE_GROW_TIME,

  coins: 5,

  // sementes por tipo
  seeds: {
    cenoura: 1,
    morango: 0,
    milho: 0,
    abobora: 0,
  },

  unlockedLands: 1,
  landPrice: BASE_LAND_PRICE,
  perkPrice: BASE_PERK_PRICE,
  unlockedPerks: 0,

  farm: Array.from({ length: MAX_LANDS }, () => null),

  missions: [
    {
      id: 1,
      text: 'Plante sua primeira semente 🌱',
      type: 'plant',
      goal: 1,
      progress: 0,
      done: false,
      letter:
        'Amor, assim como essa primeira semente, tudo que planto com você cresce e me enche de orgulho. Ainda bem que escolhi você como a fazendeira da minha vida.',
    },
    {
      id: 2,
      text: 'Colha 10 plantas 🌾',
      type: 'harvest',
      goal: 10,
      progress: 0,
      done: false,
      letter:
        'Cada colheita ao seu lado, me faz lembrar do quanto eu tenho certeza que quero ficar com você o resto da minha vida.',
    },
    {
      id: 3,
      text: 'Expanda a fazenda 🌍',
      type: 'land',
      goal: 14,
      progress: 0,
      done: false,
      letter: 'Como essa fazenda, minha vida ficou muito melhor ao seu cuidado',
    },
  ],

  // 💌 CARTA ATUAL
  activeLetter: null,
})

/* 🌱 Plantar */
function plant(index, seed) {
  if (state.seeds[seed] <= 0 || state.farm[index]) return

  state.seeds[seed]--
  state.farm[index] = {
    seed,
    stage: 'planted',
    plantedAt: Date.now(),
  }

  updateMission('plant')
  play('plant.mp3')
}

/* 🌾 Colher */
function harvest(index) {
  const tile = state.farm[index]
  if (!tile || tile.stage !== 'grown') return

  state.farm[index] = null

  // valor por tipo
  const values = {
    cenoura: 2,
    morango: 6,
    milho: 8,
    abobora: 20,
  }

  state.coins += values[tile.seed] || 1
  updateMission('harvest')
  play('harvest.mp3')
}

/* 🛒 Comprar semente */
function buySeed(type, price) {
  if (state.coins < price) return
  state.coins -= price
  state.seeds[type]++

  play('buy.mp3')

  Notify.create({
    color: 'green-7',
    textColor: 'white',
    icon: 'spa',
    message: `Semente de ${type} adicionada ao inventário`,
    timeout: 1500,
  })
}

/* 🟫 Comprar terra (preço dobra) */
function buyLand() {
  if (state.coins < state.landPrice) return
  if (state.unlockedLands >= MAX_LANDS) return

  state.coins -= state.landPrice
  state.unlockedLands++

  // dobra o preço
  state.landPrice *= 2
  updateMission('land')
  play('buy.mp3')

  Notify.create({
    color: 'green-7',
    textColor: 'white',
    icon: 'spa',
    message: `Nova terra adicionada`,
    timeout: 1500,
  })
}

function buyPerk() {
  if (state.coins < state.perkPrice) return
  if (state.unlockedPerks >= MAX_PERKS) return

  state.coins -= state.perkPrice
  state.perkPrice *= 2
  state.unlockedPerks++
  state.growTime = Math.max(2000, state.growTime * 0.5)

  play('buy.mp3')

  Notify.create({
    color: 'green-7',
    textColor: 'white',
    icon: 'spa',
    message: `Tempo reduzido para 5 segundos`,
    timeout: 1500,
  })
}

/* 📊 Total de sementes */
const totalSeeds = computed(() => Object.values(state.seeds).reduce((a, b) => a + b, 0))

/* ⏱ Crescimento */
setInterval(() => {
  state.farm.forEach((tile, i) => {
    if (tile && tile.stage === 'planted') {
      if (Date.now() - tile.plantedAt >= state.growTime) {
        state.farm[i].stage = 'grown'
      }
    }
  })
}, 500)

function updateMission(type) {
  state.missions.forEach((m) => {
    if (m.done) return
    if (m.type === type) {
      m.progress++
    }
  })
}

function completeMission(id) {
  const mission = state.missions.find((m) => m.id === id)
  if (!mission || mission.done) return
  if (mission.progress < mission.goal) return

  mission.done = true
  state.activeLetter = mission.letter
  play('complete.mp3')
}

export function useFarm() {
  return {
    state,
    plant,
    harvest,
    buySeed,
    buyLand,
    totalSeeds,
    completeMission,
    updateMission,
    buyPerk,
    MAX_PERKS,
  }
}
