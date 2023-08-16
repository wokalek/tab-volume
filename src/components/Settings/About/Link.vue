<template>
  <a
    class="
      outline-none
      underline
      underline-offset-2
      text-slate-500
      hover:text-slate-400
      ring-blue-500
      focus-visible:ring-2
      transition-all
    "
    :href="href"
    @click.prevent="createTab({ url: href })"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { createTab } from 'utils/chrome/tabs.ts'

defineProps<{
  href: string,
}>()
</script>
