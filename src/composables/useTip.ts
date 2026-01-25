import { tips, tipSupport } from '~/data/tips'

export default function (): { type: 'support', tip: Tip } | { type: 'tip', index: number, tip: Tip } | false {
  function checkUntil(until: number | undefined) {
    return until === undefined || Date.now() >= new Date(until).getTime()
  }

  function getRandomTipIndex() {
    if (tips.length === 0) return undefined
    if (tips.length === 1) return 0

    const lastIndex = options.value.tipsLastShowedIndex ?? -1
    const randomIndex = Math.floor(Math.random() * (tips.length - 1))
    const index = randomIndex >= lastIndex ? randomIndex + 1 : randomIndex

    return index
  }

  const options = useOptions()

  const { tipsHide, tipsHideUntil, tipSupportHide, tipSupportHideUntil } = options.value

  if (tipsHide === false && checkUntil(tipsHideUntil)) {
    const index = getRandomTipIndex()

    return index === undefined ? false : { type: 'tip', index, tip: tips[index]! }
  }

  if (tipSupportHide === false && checkUntil(tipSupportHideUntil)) return { type: 'support', tip: tipSupport }

  return false
}
