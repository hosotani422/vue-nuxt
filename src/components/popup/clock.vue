<script setup lang='ts'>
import * as Vue from 'vue';
import clock from '@/stores/popup/clock';
const hour = ref<Vue.ComponentPublicInstance<any>>();
const minute = ref<Vue.ComponentPublicInstance<any>>();
clock.ref.hour = hour;
clock.ref.minute = minute;
</script>

<template>
<PopupModal class="popupClock" :open="clock.state.open" :max="true">
  <div class="flex-even flex flex-col items-center gap-3">
    <canvas ref="hour" class="flex-even"
      @touchstart="clock.action.inputHour({event: $event})"
      @touchmove="clock.action.inputHour({event: $event})" />
    <canvas ref="minute" class="flex-even"
      @touchstart="clock.action.inputMinute({event: $event})"
      @touchmove="clock.action.inputMinute({event: $event})" />
  </div>
  <div class="flex-auto flex items-center justify-end gap-4">
    <InputButton class="flex-auto text-theme-fine" @click="clock.action.close()">
      {{clock.state.cancel}}</InputButton>
    <InputButton class="flex-auto text-theme-warn" @click="clock.prop.callback()">
      {{clock.state.clear}}</InputButton>
    <InputButton class="flex-auto text-theme-warn"
      @click="clock.prop.callback(clock.state.hour, clock.state.minute)">
      {{clock.state.ok}}</InputButton>
  </div>
</PopupModal>
</template>
