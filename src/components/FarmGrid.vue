<template>
  <div class="row justify-center q-gutter-md">
    <FarmTile
      v-for="(tile, i) in farm"
      :key="i"
      :tile="tile"
      :locked="i >= unlockedLands"
      :grow-time="growTime"
      @plant="openPlantDrawer(i)"
      @harvest="emit('harvest', i)"
    />

    <PlantDrawer v-model="plantDrawer" @select="(seed) => emit('plant', selectedIndex, seed)" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FarmTile from './FarmTile.vue'
import PlantDrawer from './drawers/PlantDrawer.vue'
import { useSound } from 'src/composables/useSound'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  farm: Array,
  unlockedLands: Number,
  growTime: Number,
})

const { play } = useSound()

const emit = defineEmits(['plant', 'harvest'])

const plantDrawer = ref(false)
const selectedIndex = ref(null)

function openPlantDrawer(index) {
  play('click.mp3')
  selectedIndex.value = index
  plantDrawer.value = true
}
</script>
