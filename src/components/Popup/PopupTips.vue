<template>
  <section v-if="isTemplate" class="px-5 pt-5">
    <div
      class="
        relative py-3 px-5 pr-6 border rounded-xl
        bg-blue-50 border-blue-300
        dark:bg-blue-950 dark:border-blue-900
      "
    >
      <div
        class="
          text-pretty text-sm space-y-1 select-text [&_kbd]:px-1 [&_kbd]:rounded-[4px] [&_kbd]:border
          text-blue-900 dark:text-blue-300
          [&_kbd]:border-gray-400 [&_kbd]:bg-gray-200 [&_kbd]:text-slate-950
          [&_a]:text-blue-600 [&_a]:hover:text-blue-500 dark:[&_a]:text-blue-500 dark:[&_a]:hover:text-blue-400
        "
        v-html="tip && tip.tip.content"
      />
      <button class="absolute top-0.5 right-0.5 p-0.5 cursor-pointer rounded-full text-blue-900 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/70" @click="onClickClose">
        <SvgX class="size-5 flex justify-center items-center" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import SvgX from '~/assets/images/x.svg?component'

const options = useOptions()

const isTemplate = shallowRef(true)
const tip = useTip()

function onClickClose(event: PointerEvent) {
  $options.actions.set({ ...options.value, ...{
    ...(event.altKey ? { tipSupportHide: true } : {}),
    ...(tip && tip.type === 'tip' ? { tipsLastShowedIndex: tip.index } : {}),
    tipsHideUntil: Date.now() + 1000 * 60 * 60 * 24 * (tip && tip.type === 'support' ? 1 : 7),
    tipSupportHideUntil: Date.now() + 1000 * 60 * 60 * 24 * 30 * 2,
  } })

  isTemplate.value = false
}
</script>
