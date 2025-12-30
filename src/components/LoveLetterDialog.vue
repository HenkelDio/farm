<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-pa-lg text-center">
      <div class="text-body1 q-mb-lg">
        {{ letter }}
      </div>

      <q-btn color="pink" label="Guardar no seu coração de melão" rounded @click="close" />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useFarm } from 'src/composables/useFarm'

const model = defineModel()
const { state } = useFarm()

const letter = computed(() => state.activeLetter || {})

watch(
  () => state.activeLetter,
  (val) => {
    if (val) model.value = true
  },
)

function close() {
  model.value = false
  state.activeLetter = null
}
</script>
