export const VOLUME_MIN = '0'
export const VOLUME_DEFAULT = '100'
export const VOLUME_MAX = '300'

export const VOLUME_SCALE_MAX = 10
export const VOLUME_SCALE_STEP = 10

const VOLUME_SCALE = { max: VOLUME_SCALE_MAX, step: VOLUME_SCALE_STEP }

export function valueToVolume(value: number) {
  const { max, step } = VOLUME_SCALE

  if (value <= max) return `${value}`

  return `${(max + (value - max) * step)}`
}

export function volumeToValue(volume: string) {
  const { max, step } = VOLUME_SCALE

  const volumeNumber = +volume

  if (volumeNumber <= max) return volumeNumber

  return +((max + (volumeNumber - max) / step).toFixed(0))
}
