import { ref, onBeforeMount } from 'vue'

import { getGain, onChangeGain } from 'store/gain.ts'

export default function () {
  const gain = ref(1)

  onBeforeMount(async () => {
    gain.value = await getGain()
  })

  onChangeGain((newGain) => {
    gain.value = newGain
  })

  return { gain }
}
