<script setup lang='ts'>
import * as Vue from 'vue';
import * as clock from '@/composables/popup/clock';
const hour = ref<Vue.ComponentPublicInstance<HTMLElement>>();
const minute = ref<Vue.ComponentPublicInstance<HTMLElement>>();
clock.ref.hour = hour;
clock.ref.minute = minute;
</script>

<template>
<PopupModal class="popupClock" :open="clock.state.open">
  <PartLayout class="even flex column align-center gap-l">
    <PartLayout tag="canvas" ref="hour" class="even"
      @touchstart="clock.action.inputHour({event: $event})"
      @touchmove="clock.action.inputHour({event: $event})" />
    <PartLayout tag="canvas" ref="minute" class="even"
      @touchstart="clock.action.inputMinute({event: $event})"
      @touchmove="clock.action.inputMinute({event: $event})" />
  </PartLayout>
  <PartLayout class="auto flex align-center justify-end gap-2l">
    <InputButton class="auto" @click="clock.action.close()">{{clock.state.cancel}}</InputButton>
    <InputButton class="auto error" @click="clock.variable.callback()">{{clock.state.clear}}</InputButton>
    <InputButton class="auto error"
      @click="clock.variable.callback(clock.state.hour, clock.state.minute)">{{clock.state.ok}}</InputButton>
  </PartLayout>
</PopupModal>
</template>

<style lang='scss' scoped>
.popupClock {
  ::v-deep(.home) {
    height: 80%;
  }
}
</style>
