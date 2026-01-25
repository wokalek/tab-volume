<template>
  <input
    ref="input"
    v-bind="ptInput"
    v-model.number="model"
    type="number"
    class="
        w-20 number-input-no-spin rounded-md py-1 -my-1 outline-none
        text-center proportional-nums text-[32px] font-bold leading-0
        text-slate-950 hover:bg-gray-50 focus:bg-gray-100
        dark:text-slate-50 dark:hover:bg-slate-800 dark:focus:bg-gray-800
      "
    @change="onChange"
    @keydown.enter="inputRef?.blur()"
  >
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

const model = defineModel<number>({ set: value => +value })

const props = defineProps<{ ptInput?: InputHTMLAttributes, floorTo?: number }>()

const inputRef = useTemplateRef('input')

function onChange() {
  if (!inputRef.value) return

  let value = +inputRef.value.value

  if (props.ptInput?.min) value = value < +props.ptInput.min ? +props.ptInput.min : value
  if (props.ptInput?.max) value = value > +props.ptInput.max ? +props.ptInput.max : value

  if (props.floorTo) value = _.floor(value, props.floorTo)

  inputRef.value.value = `${value}`
  model.value = value
}
</script>
