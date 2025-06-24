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
  <PopupBase aria-label="time" :open="time.state.open" :max="true">
    <main class="flex flex-1 flex-col items-center gap-3">
      <canvas
        class="aspect-square flex-1"
        @touchstart="time.handle.inputTime({ type: `hour`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @touchmove="time.handle.inputTime({ type: `hour`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @mousedown="time.handle.inputTime({ type: `hour`, x: $event.pageX, y: $event.pageY })"
        @mousemove="time.handle.inputTime({ type: `hour`, x: $event.pageX, y: $event.pageY })"
      />
      <canvas
        class="flex-1"
        @touchstart="
          time.handle.inputTime({ type: `minute`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })
        "
        @touchmove="time.handle.inputTime({ type: `minute`, x: $event.touches[0]!.pageX, y: $event.touches[0]!.pageY })"
        @mousedown="time.handle.inputTime({ type: `minute`, x: $event.pageX, y: $event.pageY })"
        @mousemove="time.handle.inputTime({ type: `minute`, x: $event.pageX, y: $event.pageY })"
      />
    </main>
    <footer class="flex flex-initial items-center justify-end gap-3">
      <InputButton class="flex-initial text-theme-fine" @click="time.handle.close()">
        {{ time.state.cancel }}</InputButton
      >
      <InputButton class="flex-initial text-theme-warn" @click="time.refer.callback()">
        {{ time.state.clear }}</InputButton
      >
      <InputButton
        class="flex-initial text-theme-warn"
        @click="time.refer.callback({ hour: time.state.hour, minute: time.state.minute })"
      >
        {{ time.state.ok }}</InputButton
      >
    </footer>
  </PopupBase>
</template>
