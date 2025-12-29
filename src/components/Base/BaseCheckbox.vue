<template>
  <div class="inline-flex size-[30px] min-w-[30px] min-h-[30px] bg-blue-100 hover:bg-blue-200 rounded-[10px] items-center justify-center cursor-pointer select-none" @click="checkboxRef?.click()">
    <input ref="checkbox" v-bind="ptInput" v-model="model" class="sr-only peer" type="checkbox">
    <img class="w-[14px] h-auto invisible peer-checked:visible" src="/src/assets/images/checkmark.svg" alt="Лого">
  </div>
</template>

<script setup lang="ts">
import { InputHTMLAttributes } from 'vue'

const model = defineModel<boolean>()

defineProps<{ ptInput?: InputHTMLAttributes }>()

const checkboxRef = useTemplateRef('checkbox')
</script>
