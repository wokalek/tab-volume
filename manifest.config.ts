import { defineManifest } from '@crxjs/vite-plugin'

import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: '__MSG_manifest_name__',
  version: pkg.version,
  minimum_chrome_version: '116',
  description: '__MSG_manifest_description__',
  default_locale: 'en',
  permissions: [
    'tabs',
    'storage',
    'offscreen',
    'activeTab',
    'tabCapture',
    'webNavigation',
  ],
  icons: { 16: 'favicons/16.png', 32: 'favicons/32.png', 48: 'favicons/48.png', 128: 'favicons/128.png' },
  action: {
    default_popup: 'src/pages/popup.html',
  },
  background: {
    type: 'module',
    service_worker: 'src/background/serviceWorker.ts',
  },
  options_page: 'src/pages/options.html',
  commands: {
    volumeUp: {
      description: '__MSG_manifest_commands_volume_up__',
      suggested_key: { default: 'Shift+Alt+Up' },
    },
    volumeDown: {
      description: '__MSG_manifest_commands_volume_down__',
      suggested_key: { default: 'Shift+Alt+Down' },
    },
    toggle: {
      description: '__MSG_manifest_commands_toggle__',
      suggested_key: { default: 'Shift+Alt+M' },
    },
  },
})
