export function loc (...args: Parameters<typeof chrome.i18n.getMessage>) {
  return chrome.i18n.getMessage(...args)
}
