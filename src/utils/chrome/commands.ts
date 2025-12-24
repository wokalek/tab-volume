export function listenCommand(...args: Parameters<typeof chrome.commands.onCommand.addListener>) {
  chrome.commands.onCommand.addListener(...args)
}
