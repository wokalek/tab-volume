import { processCurrentTab } from 'utils/chrome/tabs.ts'

export function setBadgeBackgroundColor (color: string | browserAction.ColorArray) {
  return processCurrentTab((tabId) => {
    return chrome.action.setBadgeBackgroundColor({ tabId, color })
  })
}

export function setBadgeText (text: string) {
  return processCurrentTab((tabId) => {
    return chrome.action.setBadgeText({ tabId, text })
  })
}

export function setBadgeTextColor (color: string | browserAction.ColorArray) {
  return processCurrentTab((tabId) => {
    return chrome.action.setBadgeTextColor({ tabId, color })
  })
}
