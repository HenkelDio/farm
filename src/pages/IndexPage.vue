<template>
  <q-page class="column items-center justify-center" style="background-color: #dff5e1">
    <div class="text-h6 q-mb-md q-mt-md fixed-top flex flex-center">🌱 Fazendinha da Alexia</div>

    <FarmGrid
      :farm="state.farm"
      :unlocked-lands="state.unlockedLands"
      :grow-time="GROW_TIME"
      @plant="plant"
      @harvest="harvest"
    />

    <div class="fixed-bottom q-mb-md flex flex-center">
      <Hud />
    </div>

    <love-letter-dialog v-model="loveLetterOpen" />
  </q-page>
</template>

<script setup>
import FarmGrid from 'src/components/FarmGrid.vue'
import Hud from 'src/components/Hud.vue'
import LoveLetterDialog from 'src/components/LoveLetterDialog.vue'
import { useFarm } from 'src/composables/useFarm'
import { ref, watch } from 'vue'

const { state, plant, harvest, GROW_TIME } = useFarm()

const loveLetterOpen = ref(false)

watch(
  () => state.activeLetter,
  (val) => {
    if (val) loveLetterOpen.value = true
  },
)
</script>
