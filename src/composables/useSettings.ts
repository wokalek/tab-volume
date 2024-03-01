import { ref, onBeforeMount } from 'vue'

import { getDefaultSettings, getSettings, onChangeSettings } from '@/store/settings.ts'

export default function () {
  const defaultSettings = getDefaultSettings()
  const settings = ref(defaultSettings)

  onBeforeMount(async () => {
    settings.value = await getSettings()
  })

  onChangeSettings((newSettings) => {
    settings.value = newSettings
  })

  return { settings, defaultSettings }
}
