<script setup lang='ts'>
import * as Vue from 'vue';
import calendar from '@/stores/popup/calendar';
const body = ref<Vue.ComponentPublicInstance<any>>();
const area = ref<Vue.ComponentPublicInstance<any>>();
calendar.ref.body = body;
calendar.ref.area = area;
</script>

<template>
<PopupModal :open="calendar.state.open"
  @touchmove="calendar.action.swipeStart({event: $event}), calendar.action.swipeMove({event: $event})"
  @touchend="calendar.action.swipeEnd({event: $event})">
  <div class="flex flex-auto flex-col gap-4">
    <div class="flex items-center">
      <IconPrev class="flex-auto" @click="calendar.action.pageMove({prev: true})" />
      <p class="flex-even text-center">{{calendar.state.current}}</p>
      <IconNext class="flex-auto" @click="calendar.action.pageMove({prev: false})" />
    </div>
    <ul class="flex">
      <li class="flex-even text-center text-xs" :key="`week${week}`"
        v-for="week of calendar.getter.textWeek()">{{week}}</li>
    </ul>
  </div>
  <div ref="body" class="body flex-auto overflow-hidden">
    <div ref="area" class="flex w-[300%] h-[15rem] translate-x-[-33.33%] current:transition-transform
      speed1:current:duration-1000 speed2:current:duration-500 speed3:current:duration-200
      [&.back]:translate-x-[-33.333%] [&.prev]:translate-x-0 [&.next]:translate-x-[-66.666%]"
      @touchstart="calendar.action.swipeInit({event: $event})">
      <ul class="flex flex-even flex-wrap"
        :key="`month${month.id}`" v-for="month in calendar.getter.textDay()">
        <li class="flex items-center justify-center p-2 text-base
          flex-[0_0_14.285%] border-solid border-[0.1rem] border-transparent [&.hide]:invisible
          [&.select]:text-font-dark [&.select]:bg-theme-fine [&.select]:shadow-[0_0_0_0.1rem_#303030_inset]
          [&.select]:!border-solid [&.select]:!border-[0.1rem] [&.select]:!border-[#303030]
          [&.today]:!border-solid [&.today]:!border-[0.1rem] [&.today]:!border-theme-fine"
          :class="calendar.getter.classDay(month.id, day.day)"
          :key="`month${month.id}day${day.day}`" v-for="day in month.day"
          @click="calendar.prop.callback(day.day)">{{day.text}}</li>
      </ul>
    </div>
  </div>
  <div class="flex-auto flex justify-end gap-4">
    <InputButton class="flex-auto text-theme-fine" @click="calendar.action.close()">
      {{calendar.state.cancel}}</InputButton>
    <InputButton class="flex-auto text-theme-warn" @click="calendar.prop.callback(``)">
      {{calendar.state.clear}}</InputButton>
  </div>
</PopupModal>
</template>
