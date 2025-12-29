export function listenNavigation(...args: Parameters<typeof chrome.webNavigation.onCommitted.addListener>) {
  chrome.webNavigation.onCommitted.addListener(...args)
}
