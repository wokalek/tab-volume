<template>
  <div class="relative flex justify-between items-center">
    <div class="flex items-center">
      <img class="w-5 h-5 mr-2 pointer-events-none" src="/favicons/32.png" alt="">
      <h1 class="font-trebuchet font-bold text-lg text-slate-800">
        {{ loc('app_title') }}
      </h1>
    </div>
    <button
      class="text-lg rounded-full outline-none ring-blue-500 hover:fill-slate-500 focus-visible:ring-2 transition-all"
      :class="[view.current === ViewEnum.settings ? 'fill-slate-400' : 'fill-slate-700']"
      @click="toggleStoreView(ViewEnum.settings)"
    >
      <IconSettings class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconSettings from '@/assets/icons/settings.svg?component'

import { view, ViewEnum, toggleStoreView } from '@/store/view.ts'
import { loc } from '@/utils/chrome/i18n.ts'
</script>
