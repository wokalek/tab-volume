const extensionLink = useExtensionLink()

export const tips: Tip[] = [
  { content: loc('tips_1', [`${extensionLink}/reviews`]) },
  { content: loc('tips_2') },
  { content: loc('tips_3') },
]

export const tipSupport: Tip = {
  content: loc('tip_support'),
}
