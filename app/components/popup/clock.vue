<script setup lang="ts">
import clock from "@/stores/popup/clock";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  refer: typeof clock.refer;
  state: typeof clock.state;
}>();
const emit = defineEmits<{
  close: [];
  inputTime: [arg: { type: `hour` | `minute`; x: number; y: number }];
}>();
</script>

<template>
  <BasePopup data-testid="ClockRoot" :open="state.open" :max="true">
    <div class="flex flex-1 flex-col items-center gap-3">
      <canvas
        data-id="ClockHour"
        data-testid="ClockHour"
        class="aspect-square flex-1"
        @touchstart="emit(`inputTime`, { type: `hour`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @touchmove="emit(`inputTime`, { type: `hour`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @mousedown="emit(`inputTime`, { type: `hour`, x: $event.pageX, y: $event.pageY })"
        @mousemove="emit(`inputTime`, { type: `hour`, x: $event.pageX, y: $event.pageY })"
      />
      <canvas
        data-id="ClockMinute"
        data-testid="ClockMinute"
        class="flex-1"
        @touchstart="emit(`inputTime`, { type: `minute`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @touchmove="emit(`inputTime`, { type: `minute`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @mousedown="emit(`inputTime`, { type: `minute`, x: $event.pageX, y: $event.pageY })"
        @mousemove="emit(`inputTime`, { type: `minute`, x: $event.pageX, y: $event.pageY })"
      />
    </div>
    <div class="flex flex-initial items-center justify-end gap-3">
      <InputButton data-testid="ClockCancel" class="flex-initial text-theme-fine" @click="emit(`close`)">
        {{ state.cancel }}</InputButton
      >
      <InputButton data-testid="ClockClear" class="flex-initial text-theme-warn" @click="refer.callback()">
        {{ state.clear }}</InputButton
      >
      <InputButton
        data-testid="ClockOk"
        class="flex-initial text-theme-warn"
        @click="refer.callback({ hour: state.hour, minute: state.minute })"
      >
        {{ state.ok }}</InputButton
      >
    </div>
  </BasePopup>
</template>
