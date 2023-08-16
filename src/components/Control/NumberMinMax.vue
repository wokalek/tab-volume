<template>
  <input
    type="number"
    :value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    class="
      input
      block
      w-full p-2 border rounded-full outline-none
      font-sans font-medium text-sm text-center
      text-slate-800 bg-slate-50 border-slate-300 ring-blue-500
      focus:ring-2 focus:border-transparent
      transition-all duration-300
    "
    @change="onChange"
  >
</template>

<script setup lang="ts">
import { clamp, round, toNumber } from 'lodash'

const props = withDefaults(defineProps<{
  modelValue: number,
  min: number,
  max: number,
  step?: number,
}>(), {
  step: 1,
})

const emit = defineEmits<{
  'update:modelValue': [modelValue: number],
}>()

function onChange (event: Event) {
  const target = event.target as HTMLInputElement

  let clampedValue = clamp(toNumber(target.value), props.min, props.max)
  clampedValue = clampedValue - clampedValue % props.step
  clampedValue = round(clampedValue)

  target.value = clampedValue.toString()

  emit('update:modelValue', clampedValue)
}
</script>

<style scoped lang="sass">
.input
  -moz-appearance: textfield

.input::-webkit-outer-spin-button
  -webkit-appearance: none
  margin: 0

.input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0
</style>
