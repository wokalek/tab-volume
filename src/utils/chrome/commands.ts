export function commandsOnCommand (...args: Parameters<typeof chrome.commands.onCommand.addListener>) {
  chrome.commands.onCommand.addListener(...args)
}
