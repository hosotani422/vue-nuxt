<script setup lang='ts'>
import * as Vue from 'vue';
import app from '@/stores/page/app';
import list from '@/stores/page/list';
import main from '@/stores/page/main';
const wrap = ref<Vue.ComponentPublicInstance<any>>();
const items = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
main.ref.wrap = wrap;
main.ref.items = items;
</script>

<template>
<div class="absolute z-[1] top-0 right-0 bottom-0 left-0 flex flex-col theme-grad-color"
  @click="main.action.switchEdit()"
  @touchmove="main.action.dragStart({event: $event}), main.action.dragMove({event: $event})"
  @touchend="main.action.dragEnd()">
  <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
    <IconList class="flex-auto" @click="app.action.routerList()" />
    <ClientOnly>
      <InputTextbox class="flex-even text-xl"
        :placeholder="app.getter.lang().placeholder.list" v-model="list.getter.stateUnit().title" />
    </ClientOnly>
    <IconConf class="flex-auto" @click="app.action.routerConf()" />
    <IconPlus class="flex-auto" @click="main.action.insertItem()" />
  </div>
  <ul ref="wrap" class="flex-even p-3 overflow-auto select-none">
    <ClientOnly>
      <transition-group appear>
        <li class="overflow-hidden relative h-16 flex items-center p-3 gap-3
          border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color scale-up
          [&.select]:theme-shadow-inner [&.check]:opacity-50 [&.check]:line-through
          [&.edit]:z-[1] [&.drag]:z-[1] [&.edit]:scale-[1.03] [&.drag]:scale-[1.03]
          [&.edit]:theme-shadow-outer [&.drag]:theme-shadow-outer [&.hide]:invisible"
          :class="main.getter.classItem(mainId)" @contextmenu.prevent
          :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[mainId] = el;}}"
          :key="`list${app.getter.listId()}main${mainId}`" v-for="mainId of main.getter.stateFull().sort"
          @click="main.state.status[mainId] !== `edit` && app.action.routerSub({mainId})"
          @touchlong="main.action.switchEdit({mainId}), main.action.dragInit({event: $event, mainId})">
          <InputCheck class="flex-auto" :modelValue="main.getter.stateUnit(``, mainId).check"
            @change="main.action.checkItem({event: $event, mainId})" @click.stop />
          <div class="flex-even line-clamp-1" :class="main.getter.classLimit(mainId)">
            {{main.getter.stateUnit(``, mainId).title}}</div>
          <div class="flex-auto" :class="main.getter.classLimit(mainId)">
            {{main.getter.textCount(mainId)}}</div>
          <transition>
            <div class="absolute right-3 flex gap-3 slide-right theme-back-color"
              v-show="main.getter.classItem(mainId).edit">
              <IconClone class="flex-auto" :class="main.getter.classLimit(mainId)"
                @click="main.action.copyItem({event: $event, mainId})" />
              <IconMove class="flex-auto" :class="main.getter.classLimit(mainId)"
                @click="main.action.moveItem({event: $event, mainId})" />
              <IconTrash class="flex-auto" :class="main.getter.classLimit(mainId)"
                @click="main.action.deleteItem({event: $event, mainId})" />
            </div>
          </transition>
        </li>
      </transition-group>
    </ClientOnly>
  </ul>
  <router-view v-slot="{Component}">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</div>
</template>
