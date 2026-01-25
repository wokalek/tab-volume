async function actionChange({ tabId, volume }: MessageData['serviceWorker']['change']) {
  $volume.actions.set(tabId, volume)
  $mute.actions.set(tabId, false)
  setBedge(tabId, volume)
  await createOffscreenDocument()
  sendMessage('offscreen', 'change', { tabId, volume, mediaStreamId: await $mediaStreamId.actions.setOrGet(tabId) })
}

async function actionToggle({ tabId }: MessageData['serviceWorker']['toggle']) {
  setBedge(tabId, $mute.actions.get(tabId) ? $volume.actions.get(tabId) ?? '' : 'mute')
  await createOffscreenDocument()
  sendMessage('offscreen', 'toggle', {
    tabId,
    volume: $volume.actions.get(tabId) ?? VOLUME_DEFAULT,
    mute: $mute.actions.toggle(tabId),
    mediaStreamId: await $mediaStreamId.actions.setOrGet(tabId),
  })
}

async function actionStop({ tabId }: MessageData['serviceWorker']['stop']) {
  setBedge(tabId, '')
  await createOffscreenDocument()
  sendMessage('offscreen', 'stop', { tabId })
}

listenMessage((payload) => {
  if (payload.target !== 'serviceWorker') return

  switch (payload.action) {
    case 'change': return actionChange(payload.data)
    case 'toggle': return actionToggle(payload.data)
    case 'stop': return actionStop(payload.data)
  }
})

listenCommand((command, tab) => {
  if (!tab?.id) return

  if ([CommandsEnum.volumeUp, CommandsEnum.volumeDown].includes(command as CommandsEnum)) {
    const newVolume = valueToVolume(volumeToValue($volume.actions.get(tab.id) ?? VOLUME_DEFAULT) - (command === CommandsEnum.volumeDown ? 1 : -1))

    if (+newVolume > $options.value.maxVolume || +newVolume < +VOLUME_MIN) return

    actionChange({ tabId: tab.id, volume: newVolume })
  }

  if (command === CommandsEnum.toggle) actionToggle({ tabId: tab.id })
})

listenInstalled(({ reason }) => {
  if (reason !== chrome.runtime.OnInstalledReason.UPDATE) return

  $volume.actions.removeAll()
  $mute.actions.removeAll()
  $mediaStreamId.actions.removeAll()
})

listenTabRemoved(async (tabId) => {
  if (!$mediaStreamId.actions.has(tabId)) return

  $volume.actions.remove(tabId)
  $mute.actions.remove(tabId)
  $mediaStreamId.actions.remove(tabId)
  await createOffscreenDocument()
  sendMessage('offscreen', 'stop', { tabId })
})

listenCaptureStatus(({ status, tabId }) => {
  if (status !== chrome.tabCapture.TabCaptureState.STOPPED) return
  if (!$mediaStreamId.actions.has(tabId)) return

  setBedge(tabId, '')
  $volume.actions.remove(tabId)
  $mute.actions.remove(tabId)
  $mediaStreamId.actions.remove(tabId)
})

listenNavigation(async ({ frameId, tabId }) => {
  if (frameId !== 0) return
  if (!$mediaStreamId.actions.has(tabId)) return

  if ($options.value.stopOnReload) {
    setBedge(tabId, '')
    await createOffscreenDocument()
    sendMessage('offscreen', 'stop', { tabId })

    return
  }

  setBedge(tabId, $volume.actions.get(tabId) ?? '')
})

listenConnect(async (port) => {
  if (port.name !== 'popup') return

  const tabId = await getCurrentTabId()

  if (!tabId) return

  port.onDisconnect.addListener(async () => {
    if ($volume.actions.get(tabId) !== VOLUME_DEFAULT) return

    setBedge(tabId, '')
    await createOffscreenDocument()
    sendMessage('offscreen', 'stop', { tabId })
  })
})

listenStorageChanged((changes, areaName) => {
  if (areaName !== 'sync' && !('options' in changes)) return

  const options = changes.options?.newValue as Options | undefined
  const maxVolume = options?.maxVolume ?? optionsDefaults.maxVolume

  _.each($volume.value, (volume, tabId) => {
    if (+volume > maxVolume) actionChange({ tabId: +tabId, volume: `${maxVolume}` })
  })
})

export {}
