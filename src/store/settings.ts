import { clone } from 'lodash'

import { StorageNamespaceEnum } from 'enums/storage.ts'
import { getStorage, setStorage, StorageAreaEnum, storageOnChanged } from 'utils/chrome/storage.ts'

export type SettingsType = {
  max: number,
  isBadge: 'on' | 'off',
}

const defaultSettings: SettingsType = {
  max: 300,
  isBadge: 'on',
}

export function getDefaultSettings () {
  return clone(defaultSettings)
}

export async function getSettings () {
  return await getStorage<SettingsType>(StorageAreaEnum.local, StorageNamespaceEnum.settings) || getDefaultSettings()
}

export function setSettings (value: SettingsType) {
  return setStorage(StorageAreaEnum.local, StorageNamespaceEnum.settings, value)
}

export function onChangeSettings (fn: (settings: SettingsType) => void) {
  storageOnChanged((changes, areaName) => {
    if (areaName !== StorageAreaEnum.local) {
      return
    }

    if (!(StorageNamespaceEnum.settings in changes)) {
      return
    }

    const settings = changes[StorageNamespaceEnum.settings].newValue as SettingsType

    fn(settings)
  })
}
