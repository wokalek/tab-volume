<template>
  <section class="px-5 pt-6 pb-2">
    <button
      class="
        w-full pt-4 pb-4.5 rounded-full not-disabled:cursor-pointer transition-colors
        font-arial font-bold text-[14px] tracking-wide

        text-blue-400 bg-blue-50 hover:bg-blue-100
        disabled:bg-gray-50 disabled:text-gray-300

        dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
        dark:disabled:bg-gray-800 dark:disabled:text-gray-600
      "
      type="button"
      :disabled="!mediaStream"
      @click="onClick"
    >
      <span>{{ loc('popup_reset_button') }}</span>
    </button>
  </section>
</template>

<script setup lang="ts">
const currentTabId = inject('currentTabId') as number

const mediaStream = useAtom($mediaStreamId.focus(currentTabId))

function onClick() {
  sendMessage('serviceWorker', 'stop', { tabId: currentTabId })
}
</script>
