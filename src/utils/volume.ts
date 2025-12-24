export const VOLUME_MIN = '0'
export const VOLUME_DEFAULT = '100'
export const VOLUME_MAX = '300'

export const VOLUME_SCALE = {
  linearMax: 10, // до какого значения линейная шкала
  linearStep: 1, // % за 1 шаг
  extendedStep: 10, // % за 1 шаг после linearMax
}

export function valueToVolume(value: number, scale = VOLUME_SCALE) {
  const { linearMax, linearStep, extendedStep } = scale

  if (value <= linearMax) return `${value * linearStep}`

  return `${(linearMax * linearStep + (value - linearMax) * extendedStep)}`
}

export function volumeToValue(volume: string, scale = VOLUME_SCALE) {
  const { linearMax, linearStep, extendedStep } = scale

  const volumeNumber = Number(volume)
  if (Number.isNaN(volumeNumber)) return 0

  const linearMaxVolume = linearMax * linearStep

  if (volumeNumber <= linearMaxVolume) return volumeNumber / linearStep

  return (linearMax + (volumeNumber - linearMaxVolume) / extendedStep)
}
