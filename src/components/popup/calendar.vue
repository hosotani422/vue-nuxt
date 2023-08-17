<script setup lang='ts'>
import * as Vue from 'vue';
import calendar from '@/stores/popup/calendar';
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  refer: typeof calendar.refer;
  state: typeof calendar.state;
  textWeek: Function;
  textDay: Function;
  classDay: Function;
}>();
defineEmits([
  `close`, `pageMove`, `swipeInit`, `swipeStart`, `swipeMove`, `swipeEnd`,
]);
const body = ref<Vue.ComponentPublicInstance<any>>();
const area = ref<Vue.ComponentPublicInstance<any>>();
props.refer.body = body;
props.refer.area = area;
</script>

<template>
<BasePopup data-testid="CalendarPage" :open="state.open" @touchend="$emit(`swipeEnd`, {clientX: $event.changedTouches[0]!.clientX})"
  @touchmove="$emit(`swipeStart`, {clientX: $event.changedTouches[0]!.clientX, clientY: $event.changedTouches[0]!.clientY}),
    $emit(`swipeMove`, {clientX: $event.changedTouches[0]!.clientX})">
  <div class="flex flex-auto flex-col gap-4">
    <div class="flex items-center">
      <IconPrev data-testid="CalendarPrev" class="flex-auto" @click="$emit(`pageMove`, {prev: true})" />
      <p class="flex-even text-center">{{state.current}}</p>
      <IconNext data-testid="CalendarNext" class="flex-auto" @click="$emit(`pageMove`, {prev: false})" />
    </div>
    <ul class="flex">
      <li class="flex-even text-center text-xs" :key="`week${week}`" v-for="week of textWeek()">{{week}}</li>
    </ul>
  </div>
  <div ref="body" class="body flex-auto overflow-hidden">
    <div ref="area" class="flex w-[300%] h-[15rem] translate-x-[-33.33%] current:transition-transform
      speed1:current:duration-1000 speed2:current:duration-500 speed3:current:duration-200
      [&.back]:translate-x-[-33.333%] [&.prev]:translate-x-0 [&.next]:translate-x-[-66.666%]"
      @touchstart="$emit(`swipeInit`, {target: $event.currentTarget,
        clientX: $event.changedTouches[0]!.clientX, clientY: $event.changedTouches[0]!.clientY})">
      <ul class="flex flex-even flex-wrap" :key="`month${month.id}`" v-for="month in textDay()">
        <li data-testid="CalendarItem" class="flex items-center justify-center p-2 text-base
          flex-[0_0_14.285%] border-solid border-[0.1rem] border-transparent [&.hide]:invisible
          [&.select]:text-font-dark [&.select]:bg-theme-fine [&.select]:shadow-[0_0_0_0.1rem_#303030_inset]
          [&.select]:!border-solid [&.select]:!border-[0.1rem] [&.select]:!border-[#303030]
          [&.today]:!border-solid [&.today]:!border-[0.1rem] [&.today]:!border-theme-fine"
          :class="classDay(month.id, day.day)" :key="`month${month.id}day${day.day}`" v-for="day in month.day"
          @click="state.callback(day.day)">{{day.text}}</li>
      </ul>
    </div>
  </div>
  <div class="flex-auto flex justify-end gap-4">
    <InputButton data-testid="CalendarCancel" class="flex-auto text-theme-fine"
      @click="$emit(`close`)">{{state.cancel}}</InputButton>
    <InputButton data-testid="CalendarClear" class="flex-auto text-theme-warn"
      @click="state.callback()">{{state.clear}}</InputButton>
  </div>
</BasePopup>
</template>
