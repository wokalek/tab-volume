<template>
  <div class="min-h-dvh flex flex-col items-center">
    <main class="grid m-auto py-10 px-6 w-full max-w-87.5 text-slate-950 dark:text-slate-50">
      <header class="select-none mb-8">
        <a class="inline-flex items-center gap-3.75 -mx-4 px-4 -my-2.5 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group rounded-full" :href="extensionLink" target="_blank" :title="loc('options_logo_link_title')">
          <img class="size-7.5" src="/src/assets/images/logo-icon.svg" alt="">
          <SvgLogoName class="w-28.5 transition-opacity text-slate-800 dark:text-slate-50" />
        </a>
      </header>
      <form class="grid grid-cols-[1fr_auto] font-arial items-baseline gap-x-2.5 gap-y-5 mb-10 [&>label]:text-base [&>label]:leading-[130%] [&>label]:col-span [&>label]:-m-2 [&>label]:p-2 [&>label]:cursor-pointer [&>label]:select-none">
        <label for="maxVolume">{{ loc('options_label_max_volume') }}</label>
        <div class="flex justify-center">
          <BaseInputNumber v-model="options.maxVolume" :pt-input="{ id: 'maxVolume', min: volumeMax, max: 999 }" :floor-to="-1" @change="save" />
        </div>
        <label for="darkMode">{{ loc('options_label_dark_mode') }}</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.darkMode" :pt-input="{ id: 'darkMode' }" @change="save" />
        </div>
        <label for="stopOnReload">{{ loc('options_label_stop_on_reload') }}</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.stopOnReload" :pt-input="{ id: 'stopOnReload' }" @change="save" />
        </div>
        <label for="tipsHide">{{ loc('options_label_tips_hide') }}</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.tipsHide" :pt-input="{ id: 'tipsHide' }" @change="save" />
        </div>
      </form>
      <ul class="grid gap-3 font-arial text-sm leading-[130%] text-pretty [&_a]:text-blue-600 [&_a]:hover:text-blue-500 dark:[&_a]:text-blue-500 dark:[&_a]:hover:text-blue-400">
        <li v-html="loc('options_footer_review', [`${extensionLink}/reviews`])" />
        <li v-html="loc('options_footer_support')" />
        <li v-html="loc('options_footer_github')" />
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import SvgLogoName from '~/assets/images/logo-name.svg?component'

const options = useOptions()
const extensionLink = useExtensionLink()

const volumeMax = VOLUME_MAX

function save() {
  $options.actions.set(options.value)
}

watch(() => options.value.darkMode, value => window.document.body.classList.toggle('dark', value), { immediate: true })
</script>
