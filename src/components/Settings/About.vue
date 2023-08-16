<template>
  <div class="mt-4 font-trebuchet text-xs leading-5">
    <SettingsAboutButton v-if="!isOpen" @click="isOpen = true">{{ loc('app_settings_about_link') }}</SettingsAboutButton>
    <div v-if="isOpen" class="select-text text-slate-500">
      <div class="mt-2">{{ loc('app_settings_about_contribute_part_1') }} <SettingsAboutLink href="https://github.com/wokalek/tab-volume">GitHub</SettingsAboutLink>. {{ loc('app_settings_about_contribute_part_2') }}</div>
      <div class="mt-2">{{ loc('app_settings_about_email_to') }}</div>
      <div class="mt-2">{{ loc('app_settings_about_support_part_1') }} <SettingsAboutLink href="https://boosty.to/wokalek/donate">Boosty</SettingsAboutLink>. {{ loc('app_settings_about_support_part_2') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { loc } from 'utils/chrome/i18n.ts'

const isOpen = ref(false)
</script>
