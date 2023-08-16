<template>
  <dl v-if="tabs.length" class="grid mt-4 rounded-md divide-y font-sans font-medium text-slate-800 divide-blue-50">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="flex items-center py-3 px-2 overflow-hidden cursor-pointer outline-none ring-inset ring-blue-500 hover:bg-blue-50 focus-visible:ring-2 transition-all"
      @click="onTabClick(tab)"
    >
      <dt class="relative shrink-0 mr-3 w-4 h-4">
        <img v-if="tab.favIconUrl" :src="tab.favIconUrl" class="w-full h-full" alt="">
        <IconChrome v-else class="w-full h-full fill-slate-800" />
        <IconVolume v-if="tab.audible" class="absolute -bottom-1 -right-2 w-4 h-4 fill-slate-800 stroke-white" />
      </dt>
      <dd class="truncate">
        {{ tab.title }}
      </dd>
      <dd v-if="tabsWithGain && tab.id" class="ml-auto pl-1 font-arial font-bold text-sm">
        {{ round(toNumber(tabsWithGain[tab.id]) * 100) }}%
      </dd>
    </button>
  </dl>
</template>

<script setup lang="ts">
import IconChrome from 'assets/icons/chrome.svg?component'
import IconVolume from 'assets/icons/volume.svg?component'

import { ref, computed, onBeforeMount } from 'vue'
import { isUndefined, round, toNumber } from 'lodash'

import { getAllTabs, setTabActive } from 'utils/chrome/tabs.ts'
import { getAllTabsWithGain, onChangeGain } from 'store/gain.ts'

const allTabs = ref<chrome.tabs.Tab[]>()
const tabsWithGain = ref<{[k: number]: number}[] | undefined>()

const tabs = computed(() => {
  if (isUndefined(allTabs.value)) {
    return []
  }

  return [
    ...allTabs.value.filter((tab) => !isUndefined(tab.id) && !isUndefined(tabsWithGain.value) && tab.id in tabsWithGain.value),
  ].sort((a, b) => {
    if (isUndefined(a.id) || isUndefined(b.id)) {
      return 0
    }

    return b.id - a.id
  })
})

onChangeGain(async () => {
  tabsWithGain.value = await getAllTabsWithGain()
})

onBeforeMount(async () => {
  allTabs.value = await getAllTabs()
  tabsWithGain.value = await getAllTabsWithGain()
})

function onTabClick (tab: chrome.tabs.Tab) {
  setTabActive(tab)
  window.close()
}
</script>
