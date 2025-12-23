export function getMediaStreamId(tabId: TabId) {
  return chrome.tabCapture.getMediaStreamId({ targetTabId: tabId })
}

export async function getUserMedia(mediaStreamId: string): Promise<[MediaStreamAudioSourceNode, GainNode]> {
  const audioCtx = new AudioContext()
  const gainNode = new GainNode(audioCtx)
  const sourceNode = audioCtx.createMediaStreamSource(await navigator.mediaDevices.getUserMedia({ audio: { mandatory: { chromeMediaSource: 'tab', chromeMediaSourceId: mediaStreamId } } } as MediaStreamConstraints))

  sourceNode.connect(gainNode).connect(audioCtx.destination)

  return [sourceNode, gainNode]
}

export function stopCapture(sourceNode: MediaStreamAudioSourceNode) {
  sourceNode.mediaStream.getTracks().forEach(track => track.stop())
}

export function listenCaptureStatus(...args: Parameters<typeof chrome.tabCapture.onStatusChanged['addListener']>) {
  chrome.tabCapture.onStatusChanged.addListener(...args)
}
