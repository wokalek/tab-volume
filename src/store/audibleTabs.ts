export const $audibleTabs = xoid.atom(<Record<TabId, TabInfo>>{}, state => ({
  fetch: async () => {
    state.value = (await getAudibleTabs())
      .filter((tab): tab is chrome.tabs.Tab & { id: TabId, title: string } => tab.id !== undefined && tab.title !== undefined)
      .sort((tab1, tab2) => tab2.id - tab1.id)
      .reduce((acc: Record<TabId, TabInfo>, tab) => {
        return _.set(acc, tab.id, {
          id: tab.id,
          title: tab.title,
          favIconUrl: tab.favIconUrl,
          volume: $volume.actions.get(tab.id) ?? VOLUME_DEFAULT,
          muted: $mute.actions.get(tab.id),
        } satisfies TabInfo)
      }, _.cloneDeep(state.value))
  },
  updateVolume: () => {
    state.value = _.each(_.cloneDeep(state.value), tabInfo => tabInfo.volume = $volume.actions.get(tabInfo.id) ?? VOLUME_DEFAULT)
  },
  updateMute: () => {
    state.value = _.each(_.cloneDeep(state.value), tabInfo => tabInfo.muted = $mute.actions.get(tabInfo.id))
  },
}))

listenTabUpdated((_, changeInfo) => {
  if (['audible', 'favIconUrl', 'title'].some(prop => Object.hasOwn(changeInfo, prop))) $audibleTabs.actions.fetch()
})

$volume.subscribe($audibleTabs.actions.updateVolume)
$mute.subscribe($audibleTabs.actions.updateMute)

$audibleTabs.actions.fetch()
