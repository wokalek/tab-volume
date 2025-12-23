export interface MessageData {
  serviceWorker: {
    change: { tabId: TabId, volume: string }
    toggle: { tabId: TabId }
    stop: { tabId: TabId }
  }
  offscreen: {
    change: { tabId: TabId, volume: string, mediaStreamId: string }
    toggle: { tabId: TabId, volume: string, mute: boolean, mediaStreamId: string }
    stop: { tabId: TabId }
  }
}

export type MessagePayload = {
  [T in keyof MessageData]: {
    [A in keyof MessageData[T]]: {
      target: T
      action: A
      data: MessageData[T][A]
    }
  }[keyof MessageData[T]]
}[keyof MessageData]
