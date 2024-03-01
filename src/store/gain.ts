import { StorageNamespaceEnum } from '@/enums/storage.ts'
import { StorageAreaEnum, getStorage, getStorageItem, setStorageItem, storageOnChanged } from '@/utils/chrome/storage.ts'
import { processCurrentTab } from '@/utils/chrome/tabs.ts'

export function getGain () {
  return processCurrentTab((tabId) => {
    return getStorageItem(StorageAreaEnum.session, StorageNamespaceEnum.gainByTab, tabId, 1)
  })
}

export function getGainRaw () {
  return processCurrentTab((tabId) => {
    return getStorageItem<number | undefined>(StorageAreaEnum.session, StorageNamespaceEnum.gainByTab, tabId)
  })
}

export function setGain (value: number) {
  processCurrentTab((tabId) => {
    setStorageItem(StorageAreaEnum.session, StorageNamespaceEnum.gainByTab, tabId, value)
  })
}

export function getAllTabsWithGain () {
  return getStorage<{[k: number]: number}[]>(StorageAreaEnum.session, StorageNamespaceEnum.gainByTab)
}

export function onChangeGain (fn: (gain: number) => void) {
  storageOnChanged((changes, areaName) => {
    if (areaName !== StorageAreaEnum.session) {
      return
    }

    if (!(StorageNamespaceEnum.gainByTab in changes)) {
      return
    }

    processCurrentTab((tabId) => {
      const gain = changes[StorageNamespaceEnum.gainByTab].newValue[tabId]

      fn(gain)
    })
  })
}
