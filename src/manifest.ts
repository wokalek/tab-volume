import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from '../package.json'

export default defineManifest(() => ({
  manifest_version: 3,
  name: '__MSG_manifest_name__',
  version: packageJson.version,
  default_locale: 'en',
  description: '__MSG_manifest_description__',
  author: 'wokalek@wokalek.ru',
  minimum_chrome_version: '116',
  icons: { 16: 'favicons/16.png', 32: 'favicons/32.png', 48: 'favicons/48.png', 128: 'favicons/128.png' },
  permissions: [
    'activeTab',
    'tabCapture',
    'offscreen',
    'storage',
  ],
  action: { default_popup: 'src/pages/popup.html' },
  background: { service_worker: 'src/background/serviceWorker.ts', type: 'module' },
  commands: {
    'VOLUME_UP': {
      description: '__MSG_manifest_commands_volume_up__',
      suggested_key: {
        default: 'Ctrl+Shift+Up',
      },
    },
    'VOLUME_DOWN': {
      description: '__MSG_manifest_commands_volume_down__',
      suggested_key: {
        default: 'Ctrl+Shift+Down',
      },
    },
  },
}))
