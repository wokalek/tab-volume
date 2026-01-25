export const $mediaStreamId = xoid.atom(<Record<TabId, string>>{}, state => ({
  has: (tabId: TabId) => Object.hasOwn(state.value, tabId),
  get: (tabId: TabId) => state.value[tabId],
  setOrGet: pMemoize(async (tabId: TabId) => {
    if (state.value[tabId]) return state.value[tabId]

    const mediaStreamId = await getMediaStreamId(tabId)
    state.value = _.set(_.clone(state.value), tabId, mediaStreamId)
    await setStorageItem('session', 'mediaStreamId', tabId, mediaStreamId)

    return mediaStreamId
  }, { cache: false }),
  remove: (tabId: TabId) => {
    unsetStorageItem('session', 'mediaStreamId', tabId)
  },
  removeAll: () => {
    removeStorage('session', 'mediaStreamId')
  },
}))

listenStorageChanged((changes, areaName) => areaName === 'session' && 'mediaStreamId' in changes && $mediaStreamId.update(() => changes['mediaStreamId'].newValue as Record<TabId, string> ?? {}))

;(async () => $mediaStreamId.value = await getStorage('session', 'mediaStreamId') ?? {})()
