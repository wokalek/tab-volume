export function runtimeSendMessage<Data extends { target: string, event: string, data?: object }> (data: Data) {
  chrome.runtime.sendMessage(data)
}

export function runtimeOnMessage (...args: Parameters<typeof chrome.runtime.onMessage.addListener>) {
  chrome.runtime.onMessage.addListener(...args)
}
