<template>
  <header class="px-3 flex items-center justify-between">
    <a class="inline-flex items-center space-x-2 -mx-2 px-2 -my-1 py-1 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 group rounded-full" :href="extensionLink" target="_blank" :title="loc('popup_header_logo_link_title')">
      <img class="size-5" src="/src/assets/images/logo-icon.svg" alt="">
      <SvgLogoName class="h-3.75 opacity-0 group-hover:opacity-100 transition-opacity text-slate-800 dark:text-slate-50" />
    </a>
    <button class="-mx-2 px-2 -my-2 py-2 rounded-full cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-slate-700" :title="loc('popup_header_settings_link_title')" @click="onClickOptions">
      <SvgCog class="text-slate-800 dark:text-slate-400" />
    </button>
  </header>
</template>

<script setup lang="ts">
import SvgLogoName from '~/assets/images/logo-name.svg?component'
import SvgCog from '~/assets/images/cog.svg?component'

const extensionLink = useExtensionLink()

function onClickOptions() {
  chrome.runtime.openOptionsPage()
}
</script>
