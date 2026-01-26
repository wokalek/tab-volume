import { tips, tipSupport } from '~/data/tips'

export default function (): ComputedRef<{ type: 'support', tip: Tip } | { type: 'tip', index: number, tip: Tip } | false> {
  function checkUntil(until: number | undefined) {
    return until === undefined || Date.now() >= new Date(until).getTime()
  }

  function getRandomTipIndex(lastShowedIndex?: number) {
    if (tips.length === 0) return undefined
    if (tips.length === 1) return 0

    if (lastShowedIndex === undefined) return Math.floor(Math.random() * tips.length)

    const randomIndex = Math.floor(Math.random() * (tips.length - 1))
    return randomIndex >= lastShowedIndex ? randomIndex + 1 : randomIndex
  }

  const options = useOptions()

  return computed(() => {
    const { tipsHide, tipsHideUntil, tipSupportHide, tipSupportHideUntil, tipsLastShowedIndex } = toRefs(options.value)

    if (tipsHide.value === false && checkUntil(tipsHideUntil.value)) {
      const index = getRandomTipIndex(tipsLastShowedIndex.value)

      return index === undefined ? false : { type: 'tip', index, tip: tips[index]! }
    }

    if (tipSupportHide.value === false && checkUntil(tipSupportHideUntil.value)) return { type: 'support', tip: tipSupport }

    return false
  })
}
