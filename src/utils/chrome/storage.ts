import type { PropertyPath } from 'lodash-es'

export async function getStorage<T>(area: chrome.storage.AreaName, namespace: keyof typeof StorageNamespaceEnum) {
  return (await chrome.storage[area].get(namespace))[namespace] as T | undefined
}

export function setStorage(area: chrome.storage.AreaName, namespace: keyof typeof StorageNamespaceEnum, value: unknown) {
  return chrome.storage[area].set({ [namespace]: value })
}

export function removeStorage(area: chrome.storage.AreaName, namespace: keyof typeof StorageNamespaceEnum) {
  return chrome.storage[area].remove(namespace)
}

export async function getStorageItem<T>(area: chrome.storage.AreaName, namespace: keyof typeof StorageNamespaceEnum, path: PropertyPath): Promise<T | undefined> {
  return _.get(await getStorage(area, namespace), path)
}

export async function setStorageItem(area: chrome.storage.AreaName, namespace: keyof typeof StorageNamespaceEnum, path: PropertyPath, value: unknown) {
  return setStorage(area, namespace, _.set(await getStorage(area, namespace) ?? {}, path, value))
}

export async function unsetStorageItem(area: chrome.storage.AreaName, namespace: keyof typeof StorageNamespaceEnum, path: PropertyPath) {
  const storage = await getStorage(area, namespace)
  _.unset(storage, path)
  setStorage(area, namespace, storage)
}

export function listenStorageChanged(...args: Parameters<StorageChangedEvent['addListener']>) {
  chrome.storage.onChanged.addListener(...args as Parameters<typeof chrome.storage.onChanged.addListener>)
}
