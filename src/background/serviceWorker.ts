import { clamp, isUndefined, round } from 'lodash'
import { debounce } from 'perfect-debounce'

import { CommandVolumeEnum } from '@/enums/command.ts'
import { getGain, setGain, onChangeGain, getGainRaw } from '@/store/gain.ts'
import { SettingsType, getSettings, onChangeSettings } from '@/store/settings.ts'
import { getStreamId, getStreamIdByTabId } from '@/store/stream.ts'
import { setBadge } from '@/utils/badge.ts'
import { setupOffscreenDocument } from '@/utils/chrome/offscreen.ts'
import { commandsOnCommand } from '@/utils/chrome/commands.ts'
import { tabsOnRemoved } from '@/utils/chrome/tabs.ts'
import { runtimeSendMessage } from '@/utils/chrome/runtime.ts'
import { loc } from '@/utils/chrome/i18n.ts'

const debounceChangeGain = debounce(changeGain, 0)

onChangeGain((gain) => {
  debounceChangeGain(gain)
})

onChangeSettings(async (settings) => {
  changeBadgeSetting(settings)
})

commandsOnCommand((command) => {
  runCommandChangeVolume(command)
})

tabsOnRemoved((tabId) => {
  stopCapture(tabId)
})

async function changeGain (gain: number) {
  await setupOffscreenDocument({
    url: '/src/pages/offscreen.html',
    reasons: ['USER_MEDIA'],
    justification: loc('background_offscreen_justification'),
  })

  const settings = await getSettings()
  const streamId = await getStreamId()

  if (settings.isBadge === 'on') {
    setBadge(gain)
  }

  runtimeSendMessage({
    target: 'offscreen',
    event: 'changeGain',
    data: {
      gain,
      streamId,
    },
  })
}

async function changeBadgeSetting (settings: SettingsType) {
  if (settings.isBadge === 'on') {
    const gain = await getGainRaw()

    if (!isUndefined(gain)) {
      setBadge(gain)
    }
  } else {
    setBadge('')
  }
}

async function runCommandChangeVolume (command: string) {
  const settings = await getSettings()

  const change = command === CommandVolumeEnum.volumeUp ? 0.1 : -0.1

  let gain = await getGain()
  gain = clamp(gain + change, 0, settings.max / 100)
  gain = round(gain, 2)

  setGain(gain)
}

async function stopCapture (tabId: number) {
  const streamId = await getStreamIdByTabId(tabId)

  if (!streamId) {
    return
  }

  runtimeSendMessage({
    target: 'offscreen',
    event: 'closeContext',
    data: {
      streamId,
    },
  })
}
