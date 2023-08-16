import { reactive } from 'vue'

export enum ViewEnum {
  gain = 'gain',
  settings = 'settings',
}

export const view = reactive<{
  current: ViewEnum,
}>({
  current: ViewEnum.gain,
})

export function toggleStoreView (toView: ViewEnum) {
  view.current = view.current === ViewEnum.gain ? toView : ViewEnum.gain
}
