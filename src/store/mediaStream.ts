export const $mediaStream = xoid.atom(new Map<TabId, [MediaStreamAudioSourceNode, GainNode]>(), state => ({
  setOrGet: pMemoize(async (tabId: TabId, mediaStreamId: string) => {
    if (state.value.has(tabId)) return state.value.get(tabId) as [MediaStreamAudioSourceNode, GainNode]

    const userMedia = await getUserMedia(mediaStreamId)
    state.value = state.value.set(tabId, userMedia)

    return userMedia
  }, { cache: false }),
  volume: async (tabId: TabId, volume: string, mediaStreamId: string) => {
    const [, gainNode] = await $mediaStream.actions.setOrGet(tabId, mediaStreamId)

    gainNode.gain.value = Number((+volume / 100).toFixed(2))
  },
  toggle: async (tabId: TabId, volume: string, mute: boolean, mediaStreamId: string) => {
    const [, gainNode] = await $mediaStream.actions.setOrGet(tabId, mediaStreamId)

    if (mute === false && volume === VOLUME_DEFAULT) {
      $mediaStream.actions.remove(tabId)
    }
    else {
      gainNode.gain.value = mute ? 0 : Number((+volume / 100).toFixed(2))
    }
  },
  remove: (tabId: TabId) => {
    const [sourceNode] = state.value.get(tabId) ?? []
    if (!sourceNode) return
    state.value.delete(tabId)
    stopCapture(sourceNode)
  },
}))
