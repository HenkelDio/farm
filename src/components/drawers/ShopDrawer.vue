<template>
  <q-dialog v-model="model" maximized transition-show="slide-up">
    <q-card>
      <q-toolbar class="bg-green-8 text-white">
        <q-btn flat icon="close" @click="onClose()" />
        <q-toolbar-title>🛒 Loja</q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <q-list bordered>
          <!-- 🌱 SEMENTES -->
          <q-item>
            <q-item-section class="text-bold">🌱 Sementes</q-item-section>
          </q-item>

          <q-item v-for="seed in seeds" :key="seed.type" :disable="state.coins < seed.price">
            <q-item-section> {{ seed.icon }} {{ seed.name }} </q-item-section>
            <q-item-section side> {{ seed.price }} 💰 </q-item-section>
            <q-item-section side>
              <q-btn color="green" label="Comprar" @click="buySeed(seed.type, seed.price)" />
            </q-item-section>
          </q-item>

          <!-- 🟫 TERRA -->
          <q-separator class="q-my-md" />

          <q-item :disable="state.coins < state.landPrice">
            <q-item-section> 🟫 Nova Terra </q-item-section>
            <q-item-section side> {{ state.landPrice }} 💰 </q-item-section>
            <q-item-section side>
              <q-btn
                color="brown"
                label="Comprar"
                :disable="state.unlockedLands >= 15"
                @click="buyLand"
              />
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item :disable="state.coins < state.perkPrice || state.unlockedPerks == MAX_PERKS">
            <q-item-section> ⏱️ Diminuir tempo de coleta </q-item-section>
            <q-item-section side> {{ state.perkPrice }} 💰 </q-item-section>
            <q-item-section side>
              <q-btn color="brown" label="Comprar" @click="buyPerk" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useFarm } from 'src/composables/useFarm'
import { useSound } from 'src/composables/useSound'

const model = defineModel()
const { state, buySeed, buyLand, buyPerk, MAX_PERKS } = useFarm()

const seeds = [
  { type: 'cenoura', name: 'Cenoura', icon: '🥕', price: 1 },
  { type: 'morango', name: 'Morango', icon: '🍓', price: 4 },
  { type: 'milho', name: 'Milho', icon: '🌽', price: 6 },
  { type: 'abobora', name: 'Abóbora', icon: '🎃', price: 12 },
]

const { play } = useSound()
function onClose() {
  model.value = false
  play('tap.mp3')
}
</script>
