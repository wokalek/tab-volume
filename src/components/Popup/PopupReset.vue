<template>
  <div class="px-5 pt-6">
    <button
      class="
        w-full pt-4 pb-[18px] rounded-full not-disabled:cursor-pointer transition-colors
        font-arial font-bold text-[14px] tracking-wide
        bg-blue-50 text-blue-400 hover:bg-blue-100
        disabled:bg-gray-50 disabled:text-gray-300
      "
      type="button"
      :disabled="!isCapturing"
      @click="onClick"
    >
      <span>Восстановить</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const currentTabId = inject('currentTabId') as number

const isCapturing = useAtom($mediaStreamId.focus(state => state[currentTabId]))

function onClick() {
  sendMessage('serviceWorker', 'stop', { tabId: currentTabId })
}
</script>
