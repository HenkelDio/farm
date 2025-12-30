<template>
  <div class="column items-center" v-if="!props.locked">
    <div class="tile flex flex-center" :class="bgClass" @click="onClick">
      {{ icon }}
    </div>

    <q-linear-progress
      v-if="isPlanted"
      :value="progress"
      color="green"
      size="6px"
      class="q-mt-xs"
      rounded
    />

    <div v-if="isPlanted" class="text-caption">⏳ {{ remaining }}s</div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  tile: Object,
  locked: Boolean,
  growTime: Number,
})

const emit = defineEmits(['plant', 'harvest'])

const seedIcons = {
  cenoura: '🥕',
  morango: '🍓',
  milho: '🌽',
  abobora: '🎃',
}

const isPlanted = computed(() => props.tile?.stage === 'planted')
const isGrown = computed(() => props.tile?.stage === 'grown')

const now = ref(Date.now())

const elapsed = computed(() => now.value - props.tile.plantedAt)

const progress = computed(() => Math.min(elapsed.value / props.growTime, 1))
const remaining = computed(() => Math.max(0, Math.ceil((props.growTime - elapsed.value) / 1000)))

const icon = computed(() => {
  if (props.locked) return '🔒'
  if (!props.tile) return '🟫'
  if (isPlanted.value) return '🌱'
  if (isGrown.value) return seedIcons[props.tile.seed] || '🌾'
  return '🟫'
})

const bgClass = computed(() => {
  if (props.locked) return 'bg-grey'
  if (!props.tile) return 'bg-brown'
  if (isPlanted.value) return 'bg-light-green'
  return 'bg-green'
})

function onClick() {
  if (props.locked) return
  if (!props.tile) emit('plant')
  else if (isGrown.value) emit('harvest')
}

let timer
onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 200)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.tile {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  font-size: 32px;
  cursor: pointer;
}
.bg-brown {
  background: #a1887f;
}
.bg-light-green {
  background: #aed581;
}
.bg-green {
  background: #81c784;
}
</style>
