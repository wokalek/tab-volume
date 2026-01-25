<template>
  <section class="px-5 pt-5">
    <div class="relative">
      <div class="absolute overflow-hidden pointer-events-none top-1/2 -translate-y-1/2 w-full rounded-full">
        <div class="absolute inset-0 bg-blue-300 dark:bg-blue-900" />
        <div
          class="w-full h-2 translate-0 bg-blue-600"
          :style="{ '--tw-translate-x': `calc(${rangeTranslateX}% + 24px * ${rangeThumbCompensation})` }"
        />
      </div>
      <input
        ref="input"
        v-model.number="inputValue"
        class="relative block appearance-none border-none w-full bg-transparent"
        :type="'range'"
        :step="1"
        :min="0"
        :max="rangeValueMax"
        @input="onInput"
      >
    </div>
  </section>
</template>

<script setup lang="ts">
const inputValue = defineModel<number>({ default: volumeToValue(VOLUME_DEFAULT) })

const currentTabId = inject('currentTabId') as number

const inputVolume = computed(() => valueToVolume(inputValue.value))

const tabVolume = useAtom($volume.focus(currentTabId))
const options = useOptions()

const rangeValueMax = computed(() => volumeToValue(`${options.value.maxVolume}`))
const rangePercentage = computed(() => inputValue.value * 100 / rangeValueMax.value)
const rangeTranslateX = computed(() => -_.round((100 - rangePercentage.value), 2))
const rangeThumbCompensation = computed(() => _.round(0.5 - rangePercentage.value / 100, 2))

function onInput() {
  sendMessage('serviceWorker', 'change', { tabId: currentTabId, volume: inputVolume.value })
}

watch(() => tabVolume.value ?? VOLUME_DEFAULT, value => inputValue.value = volumeToValue(value), { immediate: true })
</script>

<style scoped>
@utility track {
  @apply h-6 cursor-pointer;
}

@utility thumb {
  @apply appearance-none size-6 rounded-full border-none outline-none transition-colors;
  @apply bg-blue-600;
}

@utility thumb-hover {
  @apply bg-blue-500;
}

input::-webkit-slider-runnable-track { @apply track; }
input::-moz-range-track { @apply track; }

input::-webkit-slider-thumb { @apply thumb; }
input::-moz-range-thumb { @apply thumb; }

input::-webkit-slider-thumb:hover { @apply thumb-hover; }
input::-moz-range-thumb:hover { @apply thumb-hover; }
</style>
