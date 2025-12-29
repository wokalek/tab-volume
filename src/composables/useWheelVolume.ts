export default function () {
  const currentTabId = inject('currentTabId') as number
  const options = useOptions()

  const tabVolume = useAtom($volume.focus(state => state[currentTabId]))

  function onWheel(event: WheelEvent) {
    event.preventDefault()

    const volume = +(tabVolume.value ?? VOLUME_DEFAULT)
    const sign = Math.sign(event.deltaY)

    const newVolume = event.ctrlKey || volume < VOLUME_SCALE_MAX ? `${volume - sign}` : valueToVolume(volumeToValue(`${(sign > 0 ? _.ceil : _.floor)(volume, -1)}`) - sign)

    if (+newVolume > options.value.maxVolume || +newVolume < +VOLUME_MIN) return

    sendMessage('serviceWorker', 'change', { tabId: currentTabId, volume: newVolume })
  }

  onMounted(() => addEventListener('wheel', onWheel, { passive: false }))
  onBeforeUnmount(() => removeEventListener('wheel', onWheel))
}
