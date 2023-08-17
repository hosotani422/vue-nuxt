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
  @touchstart.self="$emit(`swipeInit`, {target: $event.currentTarget,
    clientX: $event.changedTouches[0]!.clientX, clientY: $event.changedTouches[0]!.clientY})"
  @touchmove.prevent="$emit(`dragStart`), $emit(`dragMove`, {clientY: $event.changedTouches[0]!.clientY})"
  @touchmove="$emit(`swipeStart`, {clientX: $event.changedTouches[0]!.clientX, clientY: $event.changedTouches[0]!.clientY}),
    $emit(`swipeMove`, {clientX: $event.changedTouches[0]!.clientX})"
  @touchend="$emit(`dragEnd`), $emit(`swipeEnd`, {clientX: $event.changedTouches[0]!.clientX})">
  <div ref="home" class="absolute z-[1] top-0 bottom-0 left-[57%] w-[43%] flex flex-col theme-grad-color theme-shadow-reverse">
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
      <IconRight data-testid="SubRight" class="flex-auto" @click="$emit(`routerBack`)" />
      <InputTextbox data-testid="SubTitle" class="flex-even text-xl"
        :placeholder="lang().placeholder.main" v-model="mainUnit().title" />
      <IconMode data-testid="SubMode" class="flex-auto" @click="$emit(`switchItem`)" />
    </div>
    <div class="flex-even p-3 overflow-auto">
      <transition mode="out-in">
        <InputTextarea data-testid="SubMemo" class="w-full h-full theme-back-color fade-normal"
          :placeholder="lang().placeholder.memo" v-if="!mainUnit().task"
          :modelValue="textMemo()" @input="$emit(`inputMemo`, {value: ($event.target as HTMLInputElement).value})" />
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
              <InputCheck data-testid="SubCheck" class="flex-auto" :modelValue="stateUnit(``, ``, subId).check"
                @change="$emit(`checkItem`, {subId, checked: ($event.target as HTMLInputElement).checked})" />
              <InputTextarea data-testid="SubTask" class="flex-even !p-0" :placeholder="lang().placeholder.sub"
                :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {titles[subId] = el;}}"
                v-model="stateUnit(``, ``, subId).title" @click="$emit(`switchEdit`, {subId})"
                @keydown.enter.prevent="$emit(`enterItem`, {subId, selectionStart: ($event.target as HTMLInputElement).selectionStart})"
                @keydown.backspace="index > 0 && ($event.target as HTMLInputElement).selectionStart === 0 &&
                  ($event.preventDefault(), $emit(`backItem`, {subId}))"
                @input="$emit(`inputItem`, {subId})" v-height />
              <IconDrag data-testid="SubDrag" @touchstart="$emit(`dragInit`, {subId, clientY: $event.changedTouches[0]!.clientY})" />
              <transition>
                <IconTrash data-testid="SubTrash" class="absolute right-3 slide-right theme-back-color"
                  v-if="stateFull().sort.length > 1 && classItem(subId).edit"
                  @touchstart="$emit(`deleteItem`, {subId})" />
              </transition>
            </li>
          </transition-group>
        </ul>
      </transition>
    </div>
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-reverse">
      <InputTextbox data-testid="SubCalendar" class="flex-even w-full" :class="classLimit()" :placeholder="lang().placeholder.date"
        :modelValue="mainUnit().date" @focus="$emit(`openCalendar`, {date: mainUnit().date})" readonly />
      <InputTextbox data-testid="SubClock" class="flex-even w-full" :class="classLimit()" :placeholder="lang().placeholder.time"
        :modelValue="mainUnit().time" @focus="$emit(`openClock`, {time: mainUnit().time})" readonly />
      <InputTextbox data-testid="SubDialog" class="flex-even w-full" :class="classLimit()" :placeholder="lang().placeholder.alarm"
        :modelValue="textAlarm()" @focus="$emit(`openAlarm`)" readonly />
    </div>
  </div>
</div>
</template>
