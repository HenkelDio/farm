<template>
  <q-dialog v-model="model" transition-show="slide-up">
    <q-card>
      <q-toolbar class="bg-green-8 text-white">
        <q-btn flat icon="close" @click="onClose()" />
        <q-toolbar-title>🌱 Escolha a semente</q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <q-list bordered separator>
          <q-item
            v-for="(qtd, seed) in state.seeds"
            :key="seed"
            v-show="qtd > 0"
            clickable
            v-ripple
            @click="selectSeed(seed)"
          >
            <q-item-section>{{ seedIcons[seed] }} {{ seed }}</q-item-section>
            <q-item-section side>x{{ qtd }}</q-item-section>
          </q-item>

          <div v-if="Object.keys(state.seeds).length === 0" class="text-center text-grey">
            Nenhuma semente disponível 🌾
          </div>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useFarm } from 'src/composables/useFarm'
import { useSound } from 'src/composables/useSound'

const model = defineModel()
const emit = defineEmits(['select'])

const { state } = useFarm()

const seedIcons = {
  cenoura: '🥕',
  morango: '🍓',
  milho: '🌽',
  abobora: '🎃',
}

function selectSeed(seed) {
  emit('select', seed)
  model.value = false
}

const { play } = useSound()
function onClose() {
  model.value = false
  play('tap.mp3')
}
</script>
