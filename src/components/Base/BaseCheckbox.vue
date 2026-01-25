<template>
  <div
    class="
      inline-flex size-7.5 min-w-7.5 min-h-7.5 rounded-[10px] items-center justify-center cursor-pointer select-none
      bg-blue-100 hover:bg-blue-200 has-[input:hover]:bg-blue-200
      dark:bg-gray-800 dark:hover:bg-gray-700 dark:has-[input:hover]:bg-gray-700
    "
    @click="checkboxRef?.click()"
  >
    <input ref="checkbox" v-bind="ptInput" v-model="model" class="sr-only peer" type="checkbox">
    <SvgCheckmark class="w-3.5 h-auto invisible peer-checked:visible text-blue-500 dark:text-slate-50" />
  </div>
</template>

<script setup lang="ts">
import SvgCheckmark from '~/assets/images/checkmark.svg?component'

import type { InputHTMLAttributes } from 'vue'

const model = defineModel<boolean>()

defineProps<{ ptInput?: InputHTMLAttributes }>()

const checkboxRef = useTemplateRef('checkbox')
</script>
