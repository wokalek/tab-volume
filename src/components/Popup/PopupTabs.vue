<template>
  <section v-show="Object.keys(audibleTabs).length" class="px-3 mt-4 grid gap-1.5">
    <TransitionGroup
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-300"
    >
      <button
        v-for="tab in audibleTabs"
        :key="tab.id"
        class="
          flex items-center cursor-pointer pt-1.5 pl-2.5 pr-2 pb-1.5 rounded-lg overflow-hidden
          text-center text-sm tracking-wide
          text-slate-950 bg-slate-50 hover:bg-blue-50
          dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700
        "
        type="button"
        @click="onClickTab(tab.id)"
      >
        <img v-show="loadedFavicons.has(tab.id)" class="size-5 shrink-0 mr-3" :src="tab.favIconUrl" :alt="tab.title" @load="onLoadFavicon(tab.id)">
        <img v-show="!loadedFavicons.has(tab.id)" class="size-5 shrink-0 mr-3 opacity-25" src="/src/assets/images/image.svg" :alt="tab.title">
        <span class="truncate">{{ tab.title }}</span>
      </button>
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
const audibleTabs = useAtom($audibleTabs)

const loadedFavicons = shallowReactive(new Set())

function onClickTab(tabId: TabId) {
  tabFocus(tabId)
}

function onLoadFavicon(tabId: TabId) {
  loadedFavicons.add(tabId)
}
</script>
