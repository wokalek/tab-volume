<template>
  <div>
    <ControlRange :model-value="gain" :max="round(settings.max / 100, 2)" :step="0.1" :style="{ background }" @update:model-value="onUpdateControlValue" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { round } from 'lodash'

import useGain from '@/composables/useGain.ts'
import useTailwind from '@/composables/useTailwind.ts'
import useSettings from '@/composables/useSettings.ts'
import { map } from '@/utils/math.ts'
import { setGain } from '@/store/gain.ts'

const { gain } = useGain()
const { colors } = useTailwind()
const { settings } = useSettings()

const background = computed(() => {
  const fillTo = round((gain.value / (settings.value.max / 100) * 100))
  const fillAdjustment = round(map(gain.value, 0, settings.value.max / 100, 10, -10), 2)
  const fill = `calc(${fillTo}% + ${fillAdjustment}px)`

  return `linear-gradient(to right, ${colors.blue[600]} ${fill}, ${colors.blue[300]} ${fill})`
})

function onUpdateControlValue (value: number) {
  setGain(round(value, 2))
}
</script>
