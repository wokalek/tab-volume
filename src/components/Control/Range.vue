<template>
  <input
    v-model="value"
    type="range"
    :min="min"
    :max="max"
    :step="step"
    class="
      w-full
      h-2
      appearance-none
      cursor-pointer
      rounded-full
      border-none
      outline-none
      ring-blue-500
      focus-visible:ring-2
      transition-shadow
    "
  >
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: number,
  min?: number,
  max?: number,
  step?: number | 'any',
}>(), {
  modelValue: 50,
  min: 0,
  max: 100,
  step: 1,
})

const emit = defineEmits<{
  'update:modelValue': [modelValue: number],
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', Number(value)),
})
</script>

<style scoped lang="sass">
@mixin thumb
  @apply appearance-none
  @apply w-5
  @apply h-5
  @apply bg-blue-600
  @apply rounded-full
  @apply border-none
  @apply outline-none
  @apply transition-colors

  &:hover
    @apply bg-blue-500

input::-webkit-slider-thumb
  @include thumb

input::-moz-range-thumb
  @include thumb
</style>
