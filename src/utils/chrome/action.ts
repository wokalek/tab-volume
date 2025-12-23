export function setBedge(tabId: TabId, text: string) {
  return Promise.allSettled([
    chrome.action.setBadgeText({ tabId, text }),
    chrome.action.setBadgeTextColor({ tabId, color: '#EFF6FF' }),
    chrome.action.setBadgeBackgroundColor({ tabId, color: '#155DFC' }),
  ])
}
