<script setup lang="ts">
import storeTime from "@/store/popup/time";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  time: typeof storeTime;
}>();
</script>

<template>
  <PopupBase data-testid="TimeRoot" :open="time.state.open" :max="true">
    <div class="flex flex-1 flex-col items-center gap-3">
      <canvas
        data-id="TimeHour"
        data-testid="TimeHour"
        class="aspect-square flex-1"
        @touchstart="time.handle.inputTime({ type: `hour`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @touchmove="time.handle.inputTime({ type: `hour`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @mousedown="time.handle.inputTime({ type: `hour`, x: $event.pageX, y: $event.pageY })"
        @mousemove="time.handle.inputTime({ type: `hour`, x: $event.pageX, y: $event.pageY })"
      />
      <canvas
        data-id="TimeMinute"
        data-testid="TimeMinute"
        class="flex-1"
        @touchstart="
          time.handle.inputTime({ type: `minute`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })
        "
        @touchmove="time.handle.inputTime({ type: `minute`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @mousedown="time.handle.inputTime({ type: `minute`, x: $event.pageX, y: $event.pageY })"
        @mousemove="time.handle.inputTime({ type: `minute`, x: $event.pageX, y: $event.pageY })"
      />
    </div>
    <div class="flex flex-initial items-center justify-end gap-3">
      <InputButton data-testid="TimeCancel" class="flex-initial text-theme-fine" @click="time.handle.close()">
        {{ time.state.cancel }}</InputButton
      >
      <InputButton data-testid="TimeClear" class="flex-initial text-theme-warn" @click="time.refer.callback()">
        {{ time.state.clear }}</InputButton
      >
      <InputButton
        data-testid="TimeOk"
        class="flex-initial text-theme-warn"
        @click="time.refer.callback({ hour: time.state.hour, minute: time.state.minute })"
      >
        {{ time.state.ok }}</InputButton
      >
    </div>
  </PopupBase>
</template>
