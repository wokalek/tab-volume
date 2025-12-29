<template>
  <div class="min-h-dvh flex flex-col items-center">
    <main class="grid gap-[50px] m-auto py-10 px-6 w-full max-w-[350px] text-slate-950">
      <header class="select-none">
        <a class="inline-flex items-center gap-[15px] -mx-4 px-4 -my-2.5 py-2.5 hover:bg-gray-100 transition-colors group rounded-full" :href="`https://chromewebstore.google.com/detail/tab-volume/${chromeRuntimeId}/reviews`" target="_blank" title="Оставить отзыв о расширении">
          <img class="size-[30px]" src="/src/assets/images/logo-icon.svg" alt="Лого">
          <img class="h-[22.5px] transition-opacity" src="/src/assets/images/logo-name.svg" alt="Tab Volume">
        </a>
      </header>
      <form class="grid grid-cols-[1fr_auto] col gap-y-5 font-arial items-baseline gap-x-2.5">
        <label for="maxVolume" class="text-base leading-[130%] col-span -m-2 p-2 cursor-pointer">Максимальная громкость</label>
        <div class="flex justify-center">
          <BaseInputNumber v-model="options.maxVolume" :pt-input="{ id: 'maxVolume', min: volumeMax, max: 999 }" :floor-to="-1" @change="save" />
        </div>

        <label for="stopOnReload" class="text-base leading-[130%] col-span -m-2 p-2 cursor-pointer">Восстанавливать звук при перезагрузке страницы</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.stopOnReload" :pt-input="{ id: 'stopOnReload' }" @change="save" />
        </div>

        <label for="hideHits" class="text-base leading-[130%] col-span -m-2 p-2 cursor-pointer">Скрыть подсказки</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.hideHits" :pt-input="{ id: 'hideHits' }" @change="save" />
        </div>
      </form>
      <div class="grid gap-5 font-arial text-base leading-[130%] text-pretty">
        <div>Исходный код проекта полностью открыт и доступен на Github</div>
        <div>Вы можете отблагодарить автора через Boosty</div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const chromeRuntimeId = inject('chromeRuntimeId') as string

const options = useOptions()

const volumeMax = VOLUME_MAX

function save() {
  $options.actions.set(options.value)
}
</script>
