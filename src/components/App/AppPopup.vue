<template>
  <div class="w-90 font-arial select-none py-3">
    <PopupHeader />
    <PopupInput />
    <PopupRange />
    <PopupReset />
    <PopupTabs />
  </div>
</template>

<script setup lang="ts">
chrome.runtime.connect({ name: 'popup' })

useWheelVolume()
</script>
