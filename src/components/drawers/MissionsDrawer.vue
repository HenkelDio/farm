<template>
  <q-dialog v-model="model" maximized transition-show="slide-up">
    <q-card>
      <q-toolbar class="bg-green-8 text-white">
        <q-btn flat icon="close" @click="model = false" />
        <q-toolbar-title>📜 Missões</q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <q-list bordered>
          <q-item v-for="mission in state.missions" :key="mission.id">
            <q-item-section>
              {{ mission.text }}
            </q-item-section>

            <q-item-section side>
              <q-btn
                v-if="!mission.done && mission.progress >= mission.goal"
                color="green"
                label="Coletar"
                @click="completeMission(mission.id)"
                class="q-animate--pulse"
              />

              <div v-else-if="!mission.done" class="text-caption text-grey">
                {{ mission.progress }} / {{ mission.goal }}
              </div>

              <q-icon v-else name="check" color="green" size="md" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useFarm } from 'src/composables/useFarm'

const model = defineModel()
const { state, completeMission } = useFarm()
</script>
