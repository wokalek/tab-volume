export interface TabInfo {
  id: TabId
  title: string
  favIconUrl: chrome.tabs.Tab['favIconUrl']
  volume: string
  muted: boolean
}
