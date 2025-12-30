<template>
  <div class="bg-green-8 text-white q-pa-md" style="width: 100%">
    <div class="row justify-center q-gutter-md q-mb-sm">
      <div>💰 {{ state.coins }}</div>
      <div>🌱 {{ totalSeeds }}</div>
    </div>

    <div class="row justify-around">
      <div class="column items-center cursor-pointer" @click="((shop = true), play('click.mp3'))">
        <q-icon name="store" size="3rem" />
        <div class="text-caption">Loja</div>
      </div>

      <div
        class="column items-center cursor-pointer"
        @click="((inventory = true), play('click.mp3'))"
      >
        <q-icon name="backpack" size="3rem" />
        <div class="text-caption">Inventário</div>
      </div>

      <div
        class="column items-center cursor-pointer"
        @click="((missions = true), play('click.mp3'))"
      >
        <q-icon name="assignment" size="3rem" />
        <div class="text-caption">Missões</div>
      </div>
    </div>

    <ShopDrawer v-model="shop" />
    <InventoryDrawer v-model="inventory" />
    <MissionsDrawer v-model="missions" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFarm } from 'src/composables/useFarm'

import ShopDrawer from './drawers/ShopDrawer.vue'
import InventoryDrawer from './drawers/InventoryDrawer.vue'
import MissionsDrawer from './drawers/MissionsDrawer.vue'
import { useSound } from 'src/composables/useSound'

const { state } = useFarm()

const shop = ref(false)
const inventory = ref(false)
const missions = ref(false)

const totalSeeds = computed(() => Object.values(state.seeds).reduce((a, b) => a + b, 0))

const { play } = useSound()
</script>
