function actionChange({ tabId, volume, mediaStreamId }: MessageData['offscreen']['change']) {
  $mediaStream.actions.volume(tabId, volume, mediaStreamId)
}

function actionToggle({ tabId, volume, mute, mediaStreamId }: MessageData['offscreen']['toggle']) {
  $mediaStream.actions.toggle(tabId, volume, mute, mediaStreamId)
}

function actionStop({ tabId }: MessageData['offscreen']['stop']) {
  $mediaStream.actions.remove(tabId)
}

listenMessage((payload) => {
  if (payload.target !== 'offscreen') return

  switch (payload.action) {
    case 'change': return actionChange(payload.data)
    case 'toggle': return actionToggle(payload.data)
    case 'stop': return actionStop(payload.data)
  }
})

export {}
