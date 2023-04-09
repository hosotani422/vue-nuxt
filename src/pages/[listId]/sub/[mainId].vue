<script setup lang='ts'>
import * as Vue from 'vue';
import app from '@/stores/page/app';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';
const home = ref<Vue.ComponentPublicInstance<any>>();
const wrap = ref<Vue.ComponentPublicInstance<any>>();
const items = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
const titles = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
sub.ref.home = home;
sub.ref.wrap = wrap;
sub.ref.items = items;
sub.ref.titles = titles;
</script>

<template>
<div class="absolute z-[10] top-0 right-0 bottom-0 w-[200%] theme-mask-color
  speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
  active:transition fromto:!translate-x-[50%] fromto:!bg-transparent"
  @touchstart.capture="sub.action.switchEdit()"
  @touchstart.self="sub.action.swipeInit({event: $event})"
  @touchmove="sub.action.dragStart({event: $event}), sub.action.dragMove({event: $event}),
    sub.action.swipeStart({event: $event}), sub.action.swipeMove({event: $event})"
  @touchend="sub.action.dragEnd(), sub.action.swipeEnd({event: $event})">
  <div ref="home" class="absolute z-[1] top-0 bottom-0 left-[57%] w-[43%] flex flex-col theme-grad-color theme-shadow-reverse">
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
      <IconRight class="flex-auto" @click="app.action.routerBack()" />
      <InputTextbox class="flex-even text-xl"
        :placeholder="app.getter.lang().placeholder.main" v-model="main.getter.stateUnit().title" />
      <IconMode class="flex-auto" @click="sub.action.switchItem()" />
    </div>
    <div class="flex-even p-3 overflow-auto">
      <transition mode="out-in">
        <InputTextarea class="w-full h-full theme-back-color fade-normal"
          :placeholder="app.getter.lang().placeholder.memo" v-if="!main.getter.stateUnit().task"
          :modelValue="sub.getter.textMemo()" @input="sub.action.inputMemo({event: $event})" />
        <ul ref="wrap" class="fade-normal" v-else>
          <transition-group>
            <li class="overflow-hidden relative flex items-start p-3 gap-3
              border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color scale-up
              [&.check]:opacity-50 [&.check]:line-through
              [&.edit]:z-[1] [&.drag]:z-[1] [&.edit]:scale-[1.03] [&.drag]:scale-[1.03]
              [&.edit]:theme-shadow-outer [&.drag]:theme-shadow-outer [&.hide]:invisible"
              :class="sub.getter.classItem(subId)" v-for="(subId, index) of sub.getter.stateFull().sort"
              :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[subId] = el;}}"
              :key="`list${app.getter.listId()}main${app.getter.mainId()}sub${subId}`">
              <InputCheck class="flex-auto" :modelValue="sub.getter.stateUnit(``, ``, subId).check"
                @change="sub.action.checkItem({event: $event, subId})" />
              <InputTextarea class="flex-even !p-0"
                :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {titles[subId] = el;}}"
                :placeholder="app.getter.lang().placeholder.sub"
                :modelValue="sub.getter.stateUnit(``, ``, subId).title"
                @click="sub.action.switchEdit({subId})"
                @keydown.enter.prevent="sub.action.enterItem({event: $event, subId})"
                @keydown.backspace="index > 0 && sub.action.backItem({event: $event, subId})"
                @input="sub.action.inputItem({event: $event, subId})" v-height />
              <IconDrag @touchstart="sub.action.dragInit({event: $event, subId})" />
              <transition>
                <IconTrash class="absolute right-3 slide-right theme-back-color"
                  v-show="sub.getter.stateFull().sort.length > 1 && sub.getter.classItem(subId).edit"
                  @touchstart="sub.action.deleteItem({subId})" />
              </transition>
            </li>
          </transition-group>
        </ul>
      </transition>
    </div>
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-reverse">
      <InputTextbox class="flex-even w-full" :class="sub.getter.classLimit()"
        :placeholder="app.getter.lang().placeholder.date" :modelValue="main.getter.stateUnit().date"
        @focus="sub.action.openCalendar({date: main.getter.stateUnit().date})" readonly />
      <InputTextbox class="flex-even w-full" :class="sub.getter.classLimit()"
        :placeholder="app.getter.lang().placeholder.time" :modelValue="main.getter.stateUnit().time"
        @focus="sub.action.openClock({time: main.getter.stateUnit().time})" readonly />
      <InputTextbox class="flex-even w-full" :class="sub.getter.classLimit()"
        :placeholder="app.getter.lang().placeholder.alarm" :modelValue="sub.getter.textAlarm()"
        @focus="sub.action.openAlarm()" readonly />
    </div>
  </div>
</div>
</template>
