export const createOffscreenDocument = pMemoize(async () => {
  const context = await chrome.runtime.getContexts({ contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT] })
  if (context.length) return
  return chrome.offscreen.createDocument({ url: '/src/pages/offscreen.html', reasons: [chrome.offscreen.Reason.USER_MEDIA], justification: loc('offscreen_justification') })
}, { cache: false })
