<template>
  <div class="mt-4">
    <ControlButton :disabled="isDisabled" @click="reset">
      {{ loc('app_reset_button') }}
    </ControlButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { round } from 'lodash'

import useGain from 'composables/useGain.ts'
import { setGain } from 'store/gain.ts'
import { loc } from 'utils/chrome/i18n.ts'

const { gain } = useGain()

function reset () {
  setGain(1)
}

const isDisabled = computed(() => round(gain.value, 2) === 1)
</script>
