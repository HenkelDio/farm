<template>
  <q-page
    class="column items-center justify-center q-pa-xl text-center"
    style="background-color: #dff5e1"
  >
    <div class="text-h4">Fazendinha da Alexia: O Jogo</div>
    <q-btn class="bg-green text-white q-mt-lg" to="/game" @click="play()">Começar</q-btn>
  </q-page>
</template>
<script setup>
import { useMusic } from 'src/composables/useMusic'
const { play } = useMusic()
</script>
