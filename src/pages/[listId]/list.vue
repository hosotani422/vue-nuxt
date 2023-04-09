<script setup lang='ts'>
import * as Vue from 'vue';
import constant from '@/utils/const';
import app from '@/stores/page/app';
import list from '@/stores/page/list';
const wrap = ref<Vue.ComponentPublicInstance<any>>();
const items = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
list.ref.wrap = wrap;
list.ref.items = items;
</script>

<template>
<div class="absolute z-[10] top-0 bottom-0 left-0 w-[200%] theme-mask-color
  speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
  active:transition fromto:!translate-x-[-50%] fromto:!bg-transparent"
  @click="list.action.switchEdit()"
  @touchstart.self="list.action.swipeInit({event: $event})"
  @touchmove="list.action.dragStart({event: $event}), list.action.dragMove({event: $event}),
    list.action.swipeStart({event: $event}), list.action.swipeMove({event: $event})"
  @touchend="list.action.dragEnd(), list.action.swipeEnd({event: $event})">
  <div class="absolute z-[1] top-0 bottom-0 left-0 w-[43%] flex flex-col theme-grad-color theme-shadow-normal">
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
      <IconPlus class="flex-auto" @click="list.action.insertItem()" />
      <p class="flex-even text-xl line-clamp-1">{{constant.base.title}}</p>
      <IconLeft class="flex-auto" @click="app.action.routerBack()" />
    </div>
    <ul ref="wrap" class="flex-even p-3 overflow-auto select-none">
      <transition-group>
        <li class="overflow-hidden relative h-16 flex items-center p-3 gap-3
          border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color scale-up
          [&.select]:theme-shadow-inner [&.edit]:theme-shadow-outer
          [&.edit]:z-[1] [&.edit]:scale-[1.03] [&.hide]:invisible"
          :class="list.getter.classItem(listId)"
          :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[listId] = el;}}"
          :key="`list${listId}`" v-for="listId of list.getter.stateFull().sort"
          @touchlong="list.action.switchEdit({listId}), list.action.dragInit({event: $event, listId})"
          @click="list.state.status[listId] !== `edit` && app.action.routerBack({listId})"
          @contextmenu.prevent>
          <component :is="list.getter.iconType(listId)" />
          <p class="flex-even line-clamp-1" :class="list.getter.classLimit(listId)">
            {{list.getter.stateUnit(listId).title}}</p>
          <p class="flex-auto" :class="list.getter.classLimit(listId)">
            {{list.getter.textCount(listId)}}</p>
          <transition>
            <div class="absolute right-3 flex gap-3 slide-right theme-back-color"
              v-show="list.getter.classItem(listId).edit">
              <IconClone v-if="listId !== constant.base.id.trash"
                :class="list.getter.classLimit(listId)" @click="list.action.copyItem({event: $event, listId})" />
              <IconTrash v-if="listId !== app.getter.listId() && listId !== constant.base.id.trash"
                :class="list.getter.classLimit(listId)" @click="list.action.deleteItem({event: $event, listId})" />
            </div>
          </transition>
        </li>
      </transition-group>
    </ul>
  </div>
</div>
</template>
