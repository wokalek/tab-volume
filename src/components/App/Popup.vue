<template>
  <div class="w-80 pt-3 pb-4 px-4 select-none">
    <TheHeader />

    <template v-if="view.current === ViewEnum.gain">
      <GainVolume />
      <GainSlider />
      <GainResetButton />
      <GainTabs />
    </template>

    <template v-if="view.current === ViewEnum.settings">
      <SettingsForm />
      <SettingsAbout />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

import { clamp, round } from 'lodash'

import useGain from 'composables/useGain.ts'
import useSettings from 'composables/useSettings.ts'
import { view, ViewEnum } from 'store/view.ts'
import { setGain } from 'store/gain.ts'

const { settings } = useSettings()
const { gain } = useGain()

function onWheel (event: WheelEvent) {
  if (view.current !== ViewEnum.gain) {
    return
  }

  event.preventDefault()

  let newGain = gain.value
  newGain -= Math.sign(event.deltaY) * 0.1
  newGain = clamp(newGain, 0, settings.value.max / 100)
  newGain = round(newGain, 2)

  setGain(newGain)
}

onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel)
})
</script>
