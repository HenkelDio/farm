<template>
  <q-dialog v-model="model" maximized transition-show="slide-up">
    <q-card>
      <q-toolbar class="bg-green-8 text-white">
        <q-btn flat icon="close" @click="model = false" />
        <q-toolbar-title>🎒 Inventário</q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <q-list bordered>
          <q-item v-for="(qtd, seed) in state.seeds" :key="seed">
            <q-item-section>{{ seed }}</q-item-section>
            <q-item-section side>x{{ qtd }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useFarm } from 'src/composables/useFarm'

const model = defineModel()
const { state } = useFarm()
</script>
