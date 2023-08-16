import { get, set, unset } from 'lodash'

import type { PropertyPath } from 'lodash'

export enum StorageAreaEnum {
  sync = 'sync',
  local = 'local',
  session = 'session',
}

export async function getStorage<T> (areaName: StorageAreaEnum, namespace: string): Promise<T | undefined> {
  return (await chrome.storage[areaName].get(namespace))[namespace]
}

export function setStorage (areaName: StorageAreaEnum, namespace: string, value: unknown) {
  return chrome.storage[areaName].set({ [namespace]: value })
}

export function removeStorage (areaName: StorageAreaEnum, namespaces: string | string[]) {
  return chrome.storage[areaName].remove(namespaces)
}

export async function getStorageItem<TDefault> (areaName: StorageAreaEnum, namespace: string, path: PropertyPath, defaultValue?: TDefault): Promise<TDefault> {
  return get(await getStorage(areaName, namespace), path, defaultValue) as TDefault
}

export async function setStorageItem (areaName: StorageAreaEnum, namespace: string, path: PropertyPath, value: unknown) {
  const storage = await getStorage(areaName, namespace)

  return setStorage(areaName, namespace, set(storage || {}, path, value))
}

export async function unsetStorageItem (areaName: StorageAreaEnum, namespace: string, path: PropertyPath) {
  const storage = await getStorage(areaName, namespace)

  unset(storage, path)

  setStorage(areaName, namespace, storage)
}

export function storageOnChanged (...args: Parameters<typeof chrome.storage.onChanged.addListener>) {
  chrome.storage.onChanged.addListener(...args)
}
