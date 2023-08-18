<script setup lang="ts">
import * as Vue from "vue";
import clock from "@/stores/popup/clock";
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  refer: typeof clock.refer;
  state: typeof clock.state;
}>();
const emit = defineEmits([`close`, `inputHour`, `inputMinute`]);
const hour = ref<Vue.ComponentPublicInstance<HTMLCanvasElement>>();
const minute = ref<Vue.ComponentPublicInstance<HTMLCanvasElement>>();
props.refer.hour = hour;
props.refer.minute = minute;
</script>

<template>
  <BasePopup data-testid="ClockRoot" :open="state.open" :max="true">
    <div class="flex flex-even flex-col items-center gap-3">
      <canvas
        ref="hour"
        data-testid="ClockHour"
        class="flex-even"
        @touchstart="emit(`inputHour`, { event: $event })"
        @touchmove="emit(`inputHour`, { event: $event })"
      />
      <canvas
        ref="minute"
        data-testid="ClockMinute"
        class="flex-even"
        @touchstart="emit(`inputMinute`, { event: $event })"
        @touchmove="emit(`inputMinute`, { event: $event })"
      />
    </div>
    <div class="flex flex-auto items-center justify-end gap-4">
      <InputButton data-testid="ClockCancel" class="flex-auto text-theme-fine" @click="emit(`close`)">
        {{ state.cancel }}</InputButton
      >
      <InputButton data-testid="ClockClear" class="flex-auto text-theme-warn" @click="state.callback()">
        {{ state.clear }}</InputButton
      >
      <InputButton
        data-testid="ClockOk"
        class="flex-auto text-theme-warn"
        @click="state.callback(state.hour, state.minute)"
      >
        {{ state.ok }}</InputButton
      >
    </div>
  </BasePopup>
</template>
