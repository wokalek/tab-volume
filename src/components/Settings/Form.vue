<template>
  <form class="mt-4" @change="onChange" @submit.prevent>
    <div class="grid grid-cols-2 gap-6 justify-start mb-5">
      <div class="flex flex-col items-start">
        <ControlLabel for="max" class="block mb-2">
          {{ loc('app_settings_max_label') }}
        </ControlLabel>
        <ControlNumberMinMax id="max" v-model="settings.max" name="max" :min="100" :max="10000" :step="10" />
      </div>
    </div>
    <div>
      <ControlToggle v-model="settings.isBadge" name="isBadge">
        {{ loc('app_settings_badge_toggle_label') }}
      </ControlToggle>
    </div>
    <div class="mt-6">
      <ControlButton :disabled="isEqual(settings, defaultSettings)" @click="onReset">
        {{ loc('app_settings_restore_button') }}
      </ControlButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { isEqual, round } from 'lodash'

import useSettings from '@/composables/useSettings.ts'
import { setSettings } from '@/store/settings.ts'
import { getGain, setGain } from '@/store/gain.ts'
import { loc } from '@/utils/chrome/i18n.ts'

const { settings, defaultSettings } = useSettings()

async function onChange () {
  updateGain()
  setSettings(settings.value)
}

function onReset () {
  updateGain()
  setSettings(defaultSettings)
}

async function updateGain () {
  const gain = await getGain()

  if (settings.value.max < round(gain * 100)) {
    setGain(round(settings.value.max / 100, 2))
  }
}
</script>
