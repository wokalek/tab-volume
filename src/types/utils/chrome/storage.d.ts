export type StorageChangedEvent = chrome.events.Event<(changes: Record<keyof typeof StorageNamespaceEnum, chrome.storage.StorageChange>, areaName: chrome.storage.AreaName) => void>
