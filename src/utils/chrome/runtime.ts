export function listenMessage(callback: (payload: MessagePayload) => void) {
  chrome.runtime.onMessage.addListener(callback)
}

export function listenInstalled(...args: Parameters<typeof chrome.runtime.onInstalled['addListener']>) {
  chrome.runtime.onInstalled.addListener(...args)
}

export function listenConnect(...args: Parameters<typeof chrome.runtime.onConnect['addListener']>) {
  chrome.runtime.onConnect.addListener(...args)
}

export function sendMessage<T extends keyof MessageData, A extends keyof MessageData[T], D extends MessageData[T][A]>(target: T, action: A, data?: D) {
  return chrome.runtime.sendMessage({ target, action, data })
}
