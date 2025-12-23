export const $mute = xoid.atom(<Record<TabId, boolean>>{}, state => ({
  get: (tabId: TabId) => state.value[tabId] === true,
  set: (tabId: TabId, mute: boolean) => setStorageItem('session', 'mute', tabId, mute),
  toggle: (tabId: TabId) => {
    const mute = state.value[tabId] !== true
    setStorageItem('session', 'mute', tabId, mute)
    return mute
  },
  remove: (tabId: TabId) => unsetStorageItem('session', 'mute', tabId),
  removeAll: () => removeStorage('session', 'mute'),
}))

;(async () => $mute.value = await getStorage('session', 'mute') ?? {})()

listenStorageChanged((changes, areaName) => areaName === 'session' && changes['mute']?.newValue && $mute.update(() => changes['mute'].newValue))
