<template>
  <ControlLabel ref="labelRef" class="inline-flex w-full cursor-pointer">
    <input :checked="value === 'on'" :name="name" class="sr-only peer" type="checkbox" @change="value = value === 'on' ? 'off' : 'on'">
    <span class="mr-3 flex-grow text-sm font-medium text-slate-800">
      <slot />
    </span>
    <div
      class="relative w-11 h-6 shrink-0 rounded-full ring-blue-500 peer-checked:ring-blue-600 peer-focus-visible:ring-2"
      :class="[
        value === 'on' ? 'bg-blue-500' : 'bg-gray-200',
        { 'transition-colors': isTransition },
      ]"
    >
      <div
        class="absolute top-0.5 left-[2px] h-5 w-5 border rounded-full bg-white border-gray-300"
        :class="{
          'translate-x-full border-white': value === 'on',
          'transition-color transition-transform': isTransition,
        }"
      />
    </div>
  </ControlLabel>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: 'on' | 'off',
  name?: string,
}>(), {
  modelValue: 'off',
  name: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [modelValue: 'on' | 'off'],
}>()

const isTransition = ref(false)
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

onMounted(() => {
  setTimeout(() => (isTransition.value = true), 100)
})
</script>
