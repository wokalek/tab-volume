<template>
  <section class="pl-3 pr-4 pt-3 flex justify-center">
    <BaseInputNumber v-model="inputValue" :pt-input="{ min: volumeMin, max: options.maxVolume }" @change="onChange" />
  </section>
</template>

<script setup lang="ts">
const currentTabId = inject('currentTabId') as number

const volumeMin = VOLUME_MIN

const inputValue = shallowRef(+VOLUME_DEFAULT)

const tabVolume = useAtom($volume.focus(currentTabId))
const options = useOptions()

function onChange() {
  sendMessage('serviceWorker', 'change', { tabId: currentTabId, volume: `${inputValue.value}` })
}

watch(() => tabVolume.value ?? VOLUME_DEFAULT, value => inputValue.value = +value, { immediate: true })
</script>
