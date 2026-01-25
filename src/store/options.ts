export const optionsDefaults: Options = {
  darkMode: false,
  maxVolume: +VOLUME_MAX,
  stopOnReload: false,
  tipsHide: false,
  tipsHideUntil: undefined,
  tipsLastShowedIndex: undefined,
  tipSupportHide: false,
  tipSupportHideUntil: undefined,
}

export const $options = xoid.atom(optionsDefaults, () => ({
  set: (options: Options) => setStorage('sync', 'options', options),
}))

listenStorageChanged((changes, areaName) => areaName === 'sync' && 'options' in changes && $options.update(() => changes['options'].newValue ?? optionsDefaults))

;(async () => $options.value = await getStorage('sync', 'options') ?? optionsDefaults)()
