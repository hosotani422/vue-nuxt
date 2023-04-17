<script lang='ts'>
import * as Vue from 'vue';
import clock from '@/stores/popup/clock';
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    refer: {
      type: Object as PropType<typeof clock.refer>,
      required: true,
    },
    state: {
      type: Object as PropType<typeof clock.state>,
      required: true,
    },
  },
  emits: [
    `close`, `inputHour`, `inputMinute`,
  ],
  setup(props) {
    const hour = ref<Vue.ComponentPublicInstance<any>>();
    const minute = ref<Vue.ComponentPublicInstance<any>>();
    props.refer.hour = hour;
    props.refer.minute = minute;
    return {hour, minute};
  },
});
</script>

<template>
<BasePopup class="popupClock" :open="state.open" :max="true">
  <div class="flex-even flex flex-col items-center gap-3">
    <canvas ref="hour" class="flex-even"
      @touchstart="$emit(`inputHour`, {event: $event})"
      @touchmove="$emit(`inputHour`, {event: $event})" />
    <canvas ref="minute" class="flex-even"
      @touchstart="$emit(`inputMinute`, {event: $event})"
      @touchmove="$emit(`inputMinute`, {event: $event})" />
  </div>
  <div class="flex-auto flex items-center justify-end gap-4">
    <ItemInputButton class="flex-auto text-theme-fine" @click="$emit(`close`)">
      {{state.cancel}}</ItemInputButton>
    <ItemInputButton class="flex-auto text-theme-warn" @click="state.callback()">
      {{state.clear}}</ItemInputButton>
    <ItemInputButton class="flex-auto text-theme-warn"
      @click="state.callback(state.hour, state.minute)">
      {{state.ok}}</ItemInputButton>
  </div>
</BasePopup>
</template>
