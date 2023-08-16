let creatingPromise: Promise<void> | null

export async function setupOffscreenDocument (parameters: chrome.offscreen.CreateParameters) {
  const url = chrome.runtime.getURL(parameters.url)

  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [url],
  })

  if (existingContexts.length > 0) {
    return
  }

  if (creatingPromise) {
    await creatingPromise
  } else {
    creatingPromise = chrome.offscreen.createDocument({
      ...parameters,
      url,
    })

    await creatingPromise

    creatingPromise = null
  }
}
