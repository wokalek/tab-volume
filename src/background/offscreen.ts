import { debounce } from 'perfect-debounce'

import { runtimeOnMessage } from '@/utils/chrome/runtime.ts'

const contextByStreamIdMap = new Map<string, AudioContext>()
const gainNodeByStreamIdMap = new Map<string, GainNode>()
const debouncePrepareContext = debounce(prepareContext)

runtimeOnMessage((message) => {
  if (message.target !== 'offscreen') {
    return undefined
  }

  if (message.event === 'changeGain') {
    changeGain(message.data)
  }

  if (message.event === 'closeContext') {
    closeContext(message.data)
  }
})

function changeGain (data: { streamId: string, gain: number }) {
  const gainNode = gainNodeByStreamIdMap.get(data.streamId)

  if (gainNode) {
    gainNode.gain.value = data.gain

    return
  }

  debouncePrepareContext(data)
}

async function prepareContext (data: { streamId: string, gain: number }) {
  const context = new AudioContext()
  contextByStreamIdMap.set(data.streamId, context)

  const gainNode = new GainNode(context, { gain: data.gain })
  gainNodeByStreamIdMap.set(data.streamId, gainNode)

  const media = await getUserMedia(data.streamId)
  const source = context.createMediaStreamSource(media)
  source.connect(gainNode).connect(context.destination)
}

function getUserMedia (streamId: string) {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId,
      },
    },
  } as MediaStreamConstraints)
}

function closeContext (data: { streamId: string }) {
  const context = contextByStreamIdMap.get(data.streamId)

  context?.close()

  contextByStreamIdMap.delete(data.streamId)
  gainNodeByStreamIdMap.delete(data.streamId)
}
