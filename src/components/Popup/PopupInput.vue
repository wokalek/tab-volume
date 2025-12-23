<template>
  <div class="pl-3 pr-4 pt-5 flex justify-center">
    <input
      ref="input"
      class="
        w-20 number-input-no-spin rounded-md py-1 -my-1 outline-none
        text-center proportional-nums text-[32px] font-bold leading-0
        text-slate-950 hover:bg-gray-50 focus:bg-gray-100
      "
      :value="inputValue"
      :type="'number'"
      :min="0"
      :max="300"
      @input="onInput"
      @change="onChange"
      @keydown.enter="onEnter"
    >
  </div>
</template>

<script setup lang="ts">
const inputRef = useTemplateRef('input')

const currentTabId = inject('currentTabId') as number

const tabVolume = useAtom($volume.focus(state => state[currentTabId]))

const inputValue = shallowRef(VOLUME_DEFAULT)

function onInput() {
  if (!inputRef.value) return

  const value = _.clamp(Number(inputRef.value.value), 0, 300).toString()
  inputValue.value = value
  inputRef.value.value = value
}

function onChange() {
  sendMessage('serviceWorker', 'change', { tabId: currentTabId, volume: inputValue.value })
}

function onEnter() {
  if (!inputRef.value) return

  inputRef.value.blur()
}

watch(() => tabVolume.value ?? VOLUME_DEFAULT, value => inputValue.value = value, { immediate: true })
</script>
