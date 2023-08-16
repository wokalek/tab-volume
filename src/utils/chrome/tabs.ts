import { isUndefined } from 'lodash'

export async function getCurrentTab () {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

  return tab
}

export function getAllTabs () {
  return chrome.tabs.query({})
}

export function isTabIdEmpty (tabId: number | undefined): tabId is undefined {
  return isUndefined(tabId) || tabId === chrome.tabs.TAB_ID_NONE
}

export async function processCurrentTab<TReturn> (fn: (tabId: number) => TReturn): Promise<TReturn> {
  const currentTab = await getCurrentTab()

  return fn(currentTab.id as number)
}

export function createTab (...args: Parameters<typeof chrome.tabs.create>) {
  chrome.tabs.create(...args)
}

export function tabsOnRemoved (...args: Parameters<typeof chrome.tabs.onRemoved.addListener>) {
  chrome.tabs.onRemoved.addListener(...args)
}

export function setTabActive (tab: chrome.tabs.Tab) {
  if (isUndefined(tab.id)) {
    return
  }

  chrome.windows.update(tab.windowId, { focused: true })
  chrome.tabs.update(tab.id, { active: true })
}
