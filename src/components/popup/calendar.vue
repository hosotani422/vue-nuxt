<script setup lang='ts'>
import * as Vue from 'vue';
import calendar from '@/stores/popup/calendar';
const body = ref<Vue.ComponentPublicInstance<any>>();
const area = ref<Vue.ComponentPublicInstance<any>>();
calendar.ref.body = body;
calendar.ref.area = area;
</script>

<template>
<PopupModal class="popupCalendar" :open="calendar.state.open"
  @touchmove="calendar.action.swipeStart({event: $event}), calendar.action.swipeMove({event: $event})"
  @touchend="calendar.action.swipeEnd({event: $event})">
  <PartLayout class="flex auto column gap-2l">
    <PartLayout class="flex align-center">
      <IconPrev class="auto" @click="calendar.action.pageMove({prev: true})" />
      <PartText class="even center">{{calendar.state.current}}</PartText>
      <IconNext class="auto" @click="calendar.action.pageMove({prev: false})" />
    </PartLayout>
    <PartLayout tag="ul" class="flex">
      <PartText tag="li" class="even center font-s" :key="`week${week}`"
        v-for="week of calendar.getter.textWeek()">{{week}}</PartText>
    </PartLayout>
  </PartLayout>
  <PartLayout ref="body" class="body auto hiddenXY">
    <PartLayout ref="area" class="area flex" @touchstart="calendar.action.swipeInit({event: $event})">
      <PartLayout tag="ul" class="month even flex wrap"
        :key="`month${month.id}`" v-for="month in calendar.getter.textDay()">
        <PartLayout tag="li"
          class="day flex align-center justify-center padding-m font-m"
          :class="calendar.getter.classDay(month.id, day.day)"
          :key="`month${month.id}day${day.day}`" v-for="day in month.day"
          @click="calendar.prop.callback(day.day)">{{day.text}}</PartLayout>
      </PartLayout>
    </PartLayout>
  </PartLayout>
  <PartLayout class="auto flex justify-end gap-2l">
    <InputButton class="auto" @click="calendar.action.close()">{{calendar.state.cancel}}</InputButton>
    <InputButton class="auto error" @click="calendar.prop.callback(``)">{{calendar.state.clear}}</InputButton>
  </PartLayout>
</PopupModal>
</template>

<style lang='scss' scoped>
.popupCalendar {
  ::v-deep(.body) {
    > .area {
      width: 300%;
      height: 15rem;
      transform: translateX(-100% * calc(1 / 3));
      &.back, &.prev, &.next {
        .speed1 & {
          transition: transform 1s;
        }
        .speed2 & {
          transition: transform 0.5s;
        }
        .speed3 & {
          transition: transform 0.25s;
        }
      }
      &.back {
        transform: translateX(-100% * calc(1 / 3));
      }
      &.prev {
        transform: translateX(0%);
      }
      &.next {
        transform: translateX(-100% * calc(2 / 3));
      }
      > .month {
        > .day {
          flex: 0 0 calc(100% / 7);
          border: 0.1rem solid transparent;
          &.select {
            color: $color-font-dark;
            background: $color-state-fine;
            box-shadow: 0 0 0 0.1rem $color-back-dark inset;
            border: 0.1rem solid $color-back-dark;
          }
          &.today {
            border: 0.1rem solid $color-state-fine;
          }
        }
      }
    }
  }
}
</style>
