<template>
  <label :for="props.for" class="font-sans font-medium text-sm text-slate-800">
    <slot />
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  for?: string,
}>()
</script>
