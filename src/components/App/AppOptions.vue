<template>
  <div class="min-h-dvh flex flex-col items-center">
    <main class="grid m-auto py-10 px-6 w-full max-w-[350px] text-slate-950 dark:text-slate-50">
      <header class="select-none mb-8">
        <a class="inline-flex items-center gap-[15px] -mx-4 px-4 -my-2.5 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group rounded-full" :href="extensionLink" target="_blank" title="Оставить отзыв о расширении">
          <img class="size-[30px]" src="/src/assets/images/logo-icon.svg" alt="">
          <SvgLogoName class="w-[114px] transition-opacity text-slate-800 dark:text-slate-50" />
        </a>
      </header>
      <form class="grid grid-cols-[1fr_auto] font-arial items-baseline gap-x-2.5 gap-y-5 mb-10">
        <label for="maxVolume" class="text-base leading-[130%] col-span -m-2 p-2 cursor-pointer">Максимальная громкость</label>
        <div class="flex justify-center">
          <BaseInputNumber v-model="options.maxVolume" :pt-input="{ id: 'maxVolume', min: volumeMax, max: 999 }" :floor-to="-1" @change="save" />
        </div>
        <label for="darkMode" class="text-base leading-[130%] col-span -m-2 p-2 cursor-pointer">Тёмная тема</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.darkMode" :pt-input="{ id: 'darkMode' }" @change="save" />
        </div>
        <label for="stopOnReload" class="text-base leading-[130%] col-span -m-2 p-2 cursor-pointer">Восстанавливать изменение громкости при перезагрузке вкладки</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.stopOnReload" :pt-input="{ id: 'stopOnReload' }" @change="save" />
        </div>
        <label for="tipsHide" class="text-base leading-[130%] col-span -m-2 p-2 cursor-pointer">Скрыть советы</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.tipsHide" :pt-input="{ id: 'tipsHide' }" @change="save" />
        </div>
      </form>
      <ul class="grid gap-3 font-arial text-sm leading-[130%] text-pretty [&_a]:text-blue-600 [&_a]:hover:text-blue-500 dark:[&_a]:text-blue-500 dark:[&_a]:hover:text-blue-400">
        <li><a :href="`${extensionLink}/reviews`" target="_blank">Оставить отзыв</a> о&nbsp;расширении</li>
        <li>Поддержать автора на&nbsp;<a href="https://boosty.to/wokalek/donate" target="_blank">Boosty</a></li>
        <li>Исходный код расширения на&nbsp;<a href="http://github.com/wokalek/tab-volume" target="_blank">Github</a></li>
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
