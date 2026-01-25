<template>
  <section v-if="isTemplate" class="px-5 pt-5">
    <div
      class="
        relative py-3 px-5 pr-6 border rounded-xl
        bg-blue-50 border-blue-300
        dark:bg-blue-950/50 dark:border-blue-900
      "
    >
      <div
        class="
          text-pretty text-sm space-y-1 select-text [&_kbd]:px-1 [&_kbd]:rounded-sm [&_kbd]:border
          text-blue-900 dark:text-blue-300
          [&_kbd]:border-gray-400 [&_kbd]:bg-gray-200 [&_kbd]:text-slate-950
          [&_a]:text-blue-600 [&_a]:hover:text-blue-500 dark:[&_a]:text-blue-500 dark:[&_a]:hover:text-blue-400
        "
        v-html="tip && tip.tip.content"
      />
      <button class="absolute top-0.5 right-0.5 p-0.5 cursor-pointer rounded-full text-blue-900 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50" @click="onClickClose">
        <SvgX class="size-5 flex justify-center items-center" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import SvgX from '~/assets/images/x.svg?component'

const props = defineProps<{ tip: { type: 'support', tip: Tip } | { type: 'tip', index: number, tip: Tip } }>()

const options = useOptions()

const isTemplate = shallowRef(true)

function onClickClose(event: PointerEvent) {
  const nowTime = Date.now()
  const dayTime = 1000 * 60 * 60 * 24
  const tomorrowTime = nowTime + dayTime

  let tipsHideUntil = options.value.tipsHideUntil
  let tipSupportHideUntil = options.value.tipSupportHideUntil

  if (props.tip.type === 'tip') {
    tipsHideUntil = nowTime + dayTime * 7
    tipSupportHideUntil ??= tomorrowTime
  }
  else if (props.tip.type === 'support') {
    tipsHideUntil ??= tomorrowTime
    tipSupportHideUntil = nowTime + dayTime * 30 * 2
  }

  $options.actions.set({
    ...options.value,
    ...(event.altKey ? { tipSupportHide: true } : {}),
    ...(props.tip.type === 'tip' ? { tipsLastShowedIndex: props.tip.index } : {}),
    tipsHideUntil,
    tipSupportHideUntil,
  })

  isTemplate.value = false
}
</script>
