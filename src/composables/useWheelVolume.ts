export default function () {
  const currentTabId = inject('currentTabId') as number

  const tabVolume = useAtom($volume.focus(state => state[currentTabId]))

  function onWheel(event: WheelEvent) {
    event.preventDefault()

    const newVolume = valueToVolume(volumeToValue(tabVolume.value ?? VOLUME_DEFAULT) - Math.sign(event.deltaY))

    if (+newVolume > +VOLUME_MAX || +newVolume < +VOLUME_MIN) return

    sendMessage('serviceWorker', 'change', { tabId: currentTabId, volume: newVolume })
  }

  onMounted(() => addEventListener('wheel', onWheel, { passive: false }))
  onBeforeUnmount(() => removeEventListener('wheel', onWheel))
}
