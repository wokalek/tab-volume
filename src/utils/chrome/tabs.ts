export const getCurrentTab = () => chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => tab)

export const getCurrentTabId = async () => (await getCurrentTab())?.id

export const getAudibleTabs = () => chrome.tabs.query({ audible: true })

export async function tabFocus(tabId: TabId) {
  const tab = await chrome.tabs.update(tabId, { active: true })
  if (tab) chrome.windows.update(tab.windowId, { focused: true })
}

export function listenTabUpdated(...args: Parameters<typeof chrome.tabs.onUpdated.addListener>) {
  chrome.tabs.onUpdated.addListener(...args)
}

export function listenTabRemoved(...args: Parameters<typeof chrome.tabs.onRemoved.addListener>) {
  chrome.tabs.onRemoved.addListener(...args)
}
