import { round } from 'lodash'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import colors from 'tailwindcss/lib/public/colors'

import { setBadgeText, setBadgeTextColor, setBadgeBackgroundColor } from 'utils/chrome/action.ts'

export async function setBadge (gain: number | '') {
  const gainText = gain === '' ? '' : round(gain * 100).toString()

  setBadgeText(gainText)
  setBadgeTextColor(colors.blue['50'])
  setBadgeBackgroundColor(colors.blue['600'])
}
