export const $volume = xoid.atom(<Record<TabId, string>>{}, state => ({
  get: (tabId: TabId) => state.value[tabId],
  set: (tabId: TabId, volume: string) => setStorageItem('session', 'volume', tabId, volume),
  remove: (tabId: TabId) => unsetStorageItem('session', 'volume', tabId),
  removeAll: () => removeStorage('session', 'volume'),
}))

listenStorageChanged((changes, areaName) => areaName === 'session' && 'volume' in changes && $volume.update(() => changes['volume'].newValue as Record<TabId, string> ?? {}))

;(async () => $volume.value = await getStorage('session', 'volume') ?? {})()
