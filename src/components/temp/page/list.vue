<script lang='ts'>
import * as Vue from 'vue';
import list from '@/stores/page/list';
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    refer: {
      type: Object as PropType<typeof list.refer>,
      required: true,
    },
    title: {
      type: String,
      default: ``,
    },
    trashId: {
      type: String,
      required: true,
    },
    status: {
      type: Object,
      required: true,
    },
    getListId: {
      type: Function,
      required: true,
    },
    stateFull: {
      type: Function,
      required: true,
    },
    stateUnit: {
      type: Function,
      required: true,
    },
    classItem: {
      type: Function,
      required: true,
    },
    iconType: {
      type: Function,
      required: true,
    },
    classLimit: {
      type: Function,
      required: true,
    },
    textCount: {
      type: Function,
      required: true,
    },
  },
  emits: [
    `routerBack`, `insertItem`, `copyItem`, `deleteItem`, `switchEdit`,
    `dragInit`, `dragStart`, `dragMove`, `dragEnd`,
    `swipeInit`, `swipeStart`, `swipeMove`, `swipeEnd`,
  ],
  setup(props) {
    const wrap = ref<Vue.ComponentPublicInstance<any>>();
    const items = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
    props.refer.wrap = wrap;
    props.refer.items = items;
    return {wrap, items};
  },
});
</script>

<template>
<div data-test="ListRoot" class="absolute z-[10] top-0 bottom-0 left-0 w-[200%] theme-mask-color
  speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
  active:transition fromto:!translate-x-[-50%] fromto:!bg-transparent"
  @click="$emit(`switchEdit`)" @touchstart.self="$emit(`swipeInit`, {event: $event})"
  @touchmove="$emit(`dragStart`, {event: $event}), $emit(`dragMove`, {event: $event}),
    $emit(`swipeStart`, {event: $event}), $emit(`swipeMove`, {event: $event})"
  @touchend="$emit(`dragEnd`), $emit(`swipeEnd`, {event: $event})">
  <div class="absolute z-[1] top-0 bottom-0 left-0 w-[43%] flex flex-col theme-grad-color theme-shadow-normal">
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
      <ItemIconPlus data-test="ListPlus" class="flex-auto" @click="$emit(`insertItem`)" />
      <p data-test="ListTitle" class="flex-even text-xl line-clamp-1">{{title}}</p>
      <ItemIconLeft data-test="ListLeft" class="flex-auto" @click="$emit(`routerBack`)" />
    </div>
    <ul ref="wrap" class="flex-even p-3 overflow-auto select-none">
      <transition-group>
        <li data-test="ListItem" class="overflow-hidden relative h-16 flex items-center p-3 gap-3
          border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color scale-up
          [&.select]:theme-shadow-inner [&.edit]:theme-shadow-outer
          [&.edit]:z-[1] [&.edit]:scale-[1.03] [&.hide]:invisible"
          :class="classItem(listId)" :key="`list${listId}`" v-for="listId of stateFull().sort"
          :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[listId] = el;}}"
          @touchlong="$emit(`switchEdit`, {listId}), $emit(`dragInit`, {event: $event, listId})"
          @click="status[listId] !== `edit` && $emit(`routerBack`, {listId})" @contextmenu.prevent>
          <component :is="iconType(listId)" />
          <p data-test="ListTask" class="flex-even line-clamp-1" :class="classLimit(listId)">{{stateUnit(listId).title}}</p>
          <p data-test="ListCount" class="flex-auto" :class="classLimit(listId)">{{textCount(listId)}}</p>
          <transition>
            <div class="absolute right-3 flex gap-3 slide-right theme-back-color" v-if="classItem(listId).edit">
              <ItemIconClone data-test="ListClone" v-if="listId !== trashId"
                :class="classLimit(listId)" @click="$emit(`copyItem`, {event: $event, listId})" />
              <ItemIconTrash data-test="ListTrash" v-if="listId !== getListId() && listId !== trashId"
                :class="classLimit(listId)" @click="$emit(`deleteItem`, {event: $event, listId})" />
            </div>
          </transition>
        </li>
      </transition-group>
    </ul>
  </div>
</div>
</template>
