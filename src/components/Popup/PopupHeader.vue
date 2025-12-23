<template>
  <div class="px-3 flex items-center justify-between">
    <a class="inline-flex items-center space-x-2 -mx-2 px-2 -my-1 py-1 transition-colors  hover:bg-gray-100 group rounded-full" :href="`https://chromewebstore.google.com/detail/tab-volume/${chromeRuntimeId}/reviews`" target="_blank" title="Оставить отзыв о расширении">
      <img class="size-5" src="/src/assets/images/logo-icon.svg" alt="Лого">
      <img class="h-[15px] opacity-0 group-hover:opacity-100 transition-opacity" src="/src/assets/images/logo-name.svg" alt="Tab Volume">
    </a>
    <a class="-mx-2 px-2 -my-2 py-2 rounded-full transition-colors  hover:bg-gray-100" href="" title="Настройки">
      <img src="/src/assets/images/cog.svg" alt="Настройки">
    </a>
  </div>
</template>

<script setup lang="ts">
const chromeRuntimeId = inject('chromeRuntimeId') as string
</script>
