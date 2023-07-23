<script setup lang='ts'>
import * as Vue from 'vue';
import list from '@/stores/page/list';
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  refer: typeof list.refer;
  title: string;
  trashId: string;
  status: object;
  getListId: Function;
  stateFull: Function;
  stateUnit: Function;
  classItem: Function;
  iconType: Function;
  classLimit: Function;
  textCount: Function;
}>();
defineEmits([
  `routerBack`, `insertItem`, `copyItem`, `deleteItem`, `switchEdit`,
  `dragInit`, `dragStart`, `dragMove`, `dragEnd`,
  `swipeInit`, `swipeStart`, `swipeMove`, `swipeEnd`,
]);
const wrap = ref<Vue.ComponentPublicInstance<any>>();
const items = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
props.refer.wrap = wrap;
props.refer.items = items;
</script>

<template>
<div data-testid="ListRoot" class="absolute z-[10] top-0 bottom-0 left-0 w-[200%] theme-mask-color
  speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
  active:transition fromto:!translate-x-[-50%] fromto:!bg-transparent"
  @click="$emit(`switchEdit`)" @touchstart.self="$emit(`swipeInit`, {target: $event.currentTarget,
    clientX: $event.changedTouches[0]!.clientX, clientY: $event.changedTouches[0]!.clientY})"
  @touchmove.prevent="$emit(`dragStart`), $emit(`dragMove`, {clientY: $event.changedTouches[0]!.clientY})"
  @touchmove="$emit(`swipeStart`, {clientX: $event.changedTouches[0]!.clientX, clientY: $event.changedTouches[0]!.clientY}),
    $emit(`swipeMove`, {clientX: $event.changedTouches[0]!.clientX})"
  @touchend="$emit(`dragEnd`), $emit(`swipeEnd`, {clientX: $event.changedTouches[0]!.clientX})">
  <div class="absolute z-[1] top-0 bottom-0 left-0 w-[43%] flex flex-col theme-grad-color theme-shadow-normal">
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
      <IconPlus data-testid="ListPlus" class="flex-auto" @click="$emit(`insertItem`)" />
      <p data-testid="ListTitle" class="flex-even text-xl line-clamp-1">{{title}}</p>
      <IconLeft data-testid="ListLeft" class="flex-auto" @click="$emit(`routerBack`)" />
    </div>
    <ul ref="wrap" class="flex-even p-3 overflow-auto select-none">
      <transition-group>
        <li data-testid="ListItem" class="overflow-hidden relative h-16 flex items-center p-3 gap-3
          border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color scale-up
          [&.select]:theme-shadow-inner [&.edit]:theme-shadow-outer
          [&.edit]:z-[1] [&.edit]:scale-[1.03] [&.hide]:invisible"
          :class="classItem(listId)" :key="`list${listId}`" v-for="listId of stateFull().sort"
          :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[listId] = el;}}"
          @touchlong="$emit(`switchEdit`, {listId}), $emit(`dragInit`, {listId, clientY: $event.detail.changedTouches[0]!.clientY})"
          @click="status[listId] !== `edit` && $emit(`routerBack`, {listId})" @contextmenu.prevent>
          <component :is="iconType(listId)" />
          <p data-testid="ListTask" class="flex-even line-clamp-1" :class="classLimit(listId)">{{stateUnit(listId).title}}</p>
          <p data-testid="ListCount" class="flex-auto" :class="classLimit(listId)">{{textCount(listId)}}</p>
          <transition>
            <div class="absolute right-3 flex gap-3 slide-right theme-back-color" v-if="classItem(listId).edit">
              <IconClone data-testid="ListClone" v-if="listId !== trashId"
                :class="classLimit(listId)" @click.stop="$emit(`copyItem`, {listId})" />
              <IconTrash data-testid="ListTrash" v-if="listId !== getListId() && listId !== trashId"
                :class="classLimit(listId)" @click.stop="$emit(`deleteItem`, {listId})" />
            </div>
          </transition>
        </li>
      </transition-group>
    </ul>
  </div>
</div>
</template>
