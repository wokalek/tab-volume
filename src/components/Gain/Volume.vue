<template>
  <div class="p-4 flex justify-center">
    <span class="font-arial text-2xl font-bold text-slate-800">{{ round(gain * 100) }}%</span>
  </div>
</template>

<script setup lang="ts">
import { round } from 'lodash'

import useGain from '@/composables/useGain.ts'

const { gain } = useGain()
</script>
