<script setup lang='ts'>
import * as Vue from 'vue';
import sub from '@/stores/page/sub';
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  refer: typeof sub.refer;
  lang: Function;
  listId: Function;
  mainId: Function;
  mainUnit: Function;
  stateFull: Function;
  stateUnit: Function;
  classItem: Function;
  textMemo: Function;
  classLimit: Function;
  textAlarm: Function;
}>();
defineEmits([
  `routerBack`, `inputItem`, `enterItem`, `backItem`, `deleteItem`,
  `checkItem`, `switchItem`, `switchEdit`, `inputMemo`,
  `openCalendar`, `openClock`, `openAlarm`,
  `dragInit`, `dragStart`, `dragMove`, `dragEnd`,
  `swipeInit`, `swipeStart`, `swipeMove`, `swipeEnd`,
]);
const home = ref<Vue.ComponentPublicInstance<any>>();
const wrap = ref<Vue.ComponentPublicInstance<any>>();
const items = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
const titles = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
props.refer.home = home;
props.refer.wrap = wrap;
props.refer.items = items;
props.refer.titles = titles;
</script>

<template>
<div data-testid="SubRoot" class="absolute z-[10] top-0 right-0 bottom-0 w-[200%] theme-mask-color
  speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
  active:transition fromto:!translate-x-[50%] fromto:!bg-transparent"
  @touchstart.capture="$emit(`switchEdit`)"
  @touchstart.self="$emit(`swipeInit`, {event: $event})"
  @touchmove="$emit(`dragStart`, {event: $event}), $emit(`dragMove`, {event: $event}),
    $emit(`swipeStart`, {event: $event}), $emit(`swipeMove`, {event: $event})"
  @touchend="$emit(`dragEnd`), $emit(`swipeEnd`, {event: $event})">
  <div ref="home" class="absolute z-[1] top-0 bottom-0 left-[57%] w-[43%] flex flex-col theme-grad-color theme-shadow-reverse">
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
      <ItemIconRight data-testid="SubRight" class="flex-auto" @click="$emit(`routerBack`)" />
      <ItemInputTextbox data-testid="SubTitle" class="flex-even text-xl"
        :placeholder="lang().placeholder.main" v-model="mainUnit().title" />
      <ItemIconMode data-testid="SubMode" class="flex-auto" @click="$emit(`switchItem`)" />
    </div>
    <div class="flex-even p-3 overflow-auto">
      <transition mode="out-in">
        <ItemInputTextarea data-testid="SubMemo" class="w-full h-full theme-back-color fade-normal"
          :placeholder="lang().placeholder.memo" v-if="!mainUnit().task"
          :modelValue="textMemo()" @input="$emit(`inputMemo`, {event: $event})" />
        <ul ref="wrap" class="fade-normal" v-else>
          <transition-group>
            <li data-testid="SubItem" class="overflow-hidden relative flex items-start p-3 gap-3
              border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color scale-up
              [&.check]:opacity-50 [&.check]:line-through
              [&.edit]:z-[1] [&.drag]:z-[1] [&.edit]:scale-[1.03] [&.drag]:scale-[1.03]
              [&.edit]:theme-shadow-outer [&.drag]:theme-shadow-outer [&.hide]:invisible"
              :class="classItem(subId)" v-for="(subId, index) of stateFull().sort"
              :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[subId] = el;}}"
              :key="`list${listId()}main${mainId()}sub${subId}`">
              <ItemInputCheck data-testid="SubCheck" class="flex-auto" :modelValue="stateUnit(``, ``, subId).check"
                @change="$emit(`checkItem`, {event: $event, subId})" />
              <ItemInputTextarea data-testid="SubTask" class="flex-even !p-0" :placeholder="lang().placeholder.sub"
                :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {titles[subId] = el;}}"
                v-model="stateUnit(``, ``, subId).title" @click="$emit(`switchEdit`, {subId})"
                @keydown.enter.prevent="$emit(`enterItem`, {event: $event, subId})"
                @keydown.backspace="index > 0 && $emit(`backItem`, {event: $event, subId})"
                @input="$emit(`inputItem`, {event: $event, subId})" v-height />
              <ItemIconDrag data-testid="SubDrag" @touchstart="$emit(`dragInit`, {event: $event, subId})" />
              <transition>
                <ItemIconTrash data-testid="SubTrash" class="absolute right-3 slide-right theme-back-color"
                  v-if="stateFull().sort.length > 1 && classItem(subId).edit"
                  @touchstart="$emit(`deleteItem`, {subId})" />
              </transition>
            </li>
          </transition-group>
        </ul>
      </transition>
    </div>
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-reverse">
      <ItemInputTextbox data-testid="SubCalendar" class="flex-even w-full" :class="classLimit()" :placeholder="lang().placeholder.date"
        :modelValue="mainUnit().date" @focus="$emit(`openCalendar`, {date: mainUnit().date})" readonly />
      <ItemInputTextbox data-testid="SubClock" class="flex-even w-full" :class="classLimit()" :placeholder="lang().placeholder.time"
        :modelValue="mainUnit().time" @focus="$emit(`openClock`, {time: mainUnit().time})" readonly />
      <ItemInputTextbox data-testid="SubDialog" class="flex-even w-full" :class="classLimit()" :placeholder="lang().placeholder.alarm"
        :modelValue="textAlarm()" @focus="$emit(`openAlarm`)" readonly />
    </div>
  </div>
</div>
</template>
