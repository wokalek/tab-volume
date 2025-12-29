export const optionsDefaults: Options = {
  maxVolume: +VOLUME_MAX,
  stopOnReload: true,
  hideHits: false,
}

export const $options = xoid.atom(optionsDefaults, () => ({
  set: (options: Options) => setStorage('sync', 'options', options),
}))

;(async () => $options.value = await getStorage('sync', 'options') || optionsDefaults)()

listenStorageChanged((changes, areaName) => areaName === 'sync' && changes['options']?.newValue && $options.update(() => changes['options'].newValue || optionsDefaults))
