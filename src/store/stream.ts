import { isUndefined } from 'lodash'

import { StorageNamespaceEnum } from '@/enums/storage.ts'
import { StorageAreaEnum, getStorageItem, setStorageItem } from '@/utils/chrome/storage.ts'
import { processCurrentTab } from '@/utils/chrome/tabs.ts'

export function getStreamIdByTabId (tabId: number) {
  return getStorageItem<string | undefined>(StorageAreaEnum.session, StorageNamespaceEnum.streamIdByTab, tabId)
}

export function getStreamId () {
  return processCurrentTab(async (tabId) => {
    let streamId = await getStreamIdByTabId(tabId)

    if (isUndefined(streamId)) {
      streamId = await chrome.tabCapture.getMediaStreamId({ targetTabId: tabId })
      await setStorageItem(StorageAreaEnum.session, StorageNamespaceEnum.streamIdByTab, tabId, streamId)
    }

    return streamId
  })
}
