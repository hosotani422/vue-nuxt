<script setup lang="ts">
import storeDate from "@/store/popup/date";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  date: typeof storeDate;
}>();
</script>

<template>
  <PopupBase
    aria-label="date"
    :open="date.state.open"
    @touchmove="
      date.handle.swipeStart({ x: $event.changedTouches[0]!.clientX, y: $event.changedTouches[0]!.clientY });
      date.handle.swipeMove({ x: $event.changedTouches[0]!.clientX });
    "
    @mousemove="
      date.handle.swipeStart({ x: $event.clientX, y: $event.clientY });
      date.handle.swipeMove({ x: $event.clientX });
    "
    @touchend="date.handle.swipeEnd({ x: $event.changedTouches[0]!.clientX })"
    @mouseup="date.handle.swipeEnd({ x: $event.clientX })"
  >
    <header class="flex flex-initial flex-col gap-3">
      <div class="flex flex-initial items-center">
        <IconAngle class="flex-initial rotate-180" @click="date.handle.pageMove({ mode: `prev` })" />
        <p class="flex-1 text-center">{{ date.state.current }}</p>
        <IconAngle class="flex-initial" @click="date.handle.pageMove({ mode: `next` })" />
      </div>
      <ul class="flex flex-initial">
        <li v-for="week of date.render.getWeek()" :key="week" class="flex-1 text-center text-xs">
          {{ week }}
        </li>
      </ul>
    </header>
    <main class="flex-initial overflow-x-hidden">
      <div
        class="trans-slide-date flex h-64 w-[300%] [transform:translateX(-33.33%)]"
        @touchstart="
          date.handle.swipeInit({ x: $event.changedTouches[0]!.clientX, y: $event.changedTouches[0]!.clientY })
        "
        @mousedown="date.handle.swipeInit({ x: $event.clientX, y: $event.clientY })"
      >
        <ul v-for="month in date.render.getDay()" :key="month.id" class="flex flex-1 flex-wrap">
          <li
            v-for="day in month.day"
            :key="day.id"
            class="flex flex-[0_0_14.285%] items-center justify-center border-[0.1rem] border-solid border-transparent [&.hide]:invisible [&.select]:border-theme-fine! [&.today]:text-theme-fine"
            :class="date.render.classStatus({ month: month.id, day: day.id })"
            @click="date.refer.callback(day.id)"
          >
            {{ day.text }}
          </li>
        </ul>
      </div>
    </main>
    <footer class="flex flex-initial justify-end gap-3">
      <InputButton class="flex-initial text-theme-fine" @click="date.handle.close()">{{
        date.state.cancel
      }}</InputButton>
      <InputButton class="flex-initial text-theme-warn" @click="date.refer.callback(``)">{{
        date.state.clear
      }}</InputButton>
    </footer>
  </PopupBase>
</template>
