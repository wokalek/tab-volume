listenMessage((payload) => {
  if (payload.target !== 'serviceWorker') return

  switch (payload.action) {
    case 'change': return actionChange(payload.data)
    case 'toggle': return actionToggle(payload.data)
    case 'stop': return actionStop(payload.data)
  }
})

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

listenCommand((command, tab) => {
  if (!tab?.id) return

  if ([CommandsEnum.volumeUp, CommandsEnum.volumeDown].includes(command as CommandsEnum)) {
    const newVolume = valueToVolume(volumeToValue($volume.actions.get(tab.id) ?? VOLUME_DEFAULT) - (command === CommandsEnum.volumeDown ? 1 : -1))

    if (+newVolume > +VOLUME_MAX || +newVolume < +VOLUME_MIN) return

    actionChange({ tabId: tab.id, volume: newVolume })
  }

  if (command === CommandsEnum.toggle) actionToggle({ tabId: tab.id })
})

listenInstalled((details) => {
  if (details.reason !== chrome.runtime.OnInstalledReason.UPDATE) return

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

listenCaptureStatus((info) => {
  if (info.status !== chrome.tabCapture.TabCaptureState.STOPPED) return

  setBedge(info.tabId, '')
  $volume.actions.remove(info.tabId)
  $mute.actions.remove(info.tabId)
  $mediaStreamId.actions.remove(info.tabId)
})

listenConnect(async (port) => {
  if (port.name !== 'popup') return

  const tabId = await getCurrentTabId()

  if (!tabId) return

  port.onDisconnect.addListener(async () => {
    if ($volume.actions.get(tabId) === VOLUME_DEFAULT) {
      setBedge(tabId, '')
      await createOffscreenDocument()
      sendMessage('offscreen', 'stop', { tabId })
    }
  })
})

export {}
