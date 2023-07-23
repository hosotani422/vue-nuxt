<script setup lang='ts'>
import * as Vue from 'vue';
import main from '@/stores/page/main';
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  refer: typeof main.refer;
  status: object;
  lang: Function;
  listId: Function;
  listUnit: Function;
  stateFull: Function;
  stateUnit: Function;
  classItem: Function;
  classLimit: Function;
  textCount: Function;
}>();
defineEmits([
  `routerList`, `routerSub`, `routerConf`, `insertItem`, `copyItem`, `moveItem`, `deleteItem`,
  `checkItem`, `switchEdit`, `dragInit`, `dragStart`, `dragMove`, `dragEnd`,
]);
const wrap = ref<Vue.ComponentPublicInstance<any>>();
const items = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
props.refer.wrap = wrap;
props.refer.items = items;
</script>

<template>
<div data-testid="MainRoot" class="absolute z-[1] top-0 right-0 bottom-0 left-0 flex flex-col theme-grad-color"
  @click="$emit(`switchEdit`)" @touchend="$emit(`dragEnd`)"
  @touchmove="$emit(`dragStart`, {event: $event}), $emit(`dragMove`, {event: $event})">
  <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
    <IconList data-testid="MainList" class="flex-auto" @click="$emit(`routerList`)" />
    <ClientOnly class="flex-even">
      <InputTextbox data-testid="MainTitle" class="flex-even text-xl"
        :placeholder="lang().placeholder.list" v-model="listUnit().title" />
    </ClientOnly>
    <IconConf data-testid="MainConf" class="flex-auto" @click="$emit(`routerConf`)" />
    <IconPlus data-testid="MainPlus" class="flex-auto" @click="$emit(`insertItem`)" />
  </div>
  <ul ref="wrap" class="flex-even p-3 overflow-auto select-none">
    <ClientOnly>
      <transition-group appear>
        <li data-testid="MainItem" class="overflow-hidden relative h-16 flex items-center p-3 gap-3
          border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color scale-up
          [&.select]:theme-shadow-inner [&.check]:opacity-50 [&.check]:line-through
          [&.edit]:z-[1] [&.drag]:z-[1] [&.edit]:scale-[1.03] [&.drag]:scale-[1.03]
          [&.edit]:theme-shadow-outer [&.drag]:theme-shadow-outer [&.hide]:invisible"
          :class="classItem(mainId)" @contextmenu.prevent
          :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[mainId] = el;}}"
          :key="`list${listId()}main${mainId}`" v-for="mainId of stateFull().sort"
          @click="status[mainId] !== `edit` && $emit(`routerSub`, {mainId})"
          @touchlong="$emit(`switchEdit`, {mainId}), $emit(`dragInit`, {event: $event, mainId})">
          <InputCheck data-testid="MainCheck" class="flex-auto" :modelValue="stateUnit(``, mainId).check"
            @change="$emit(`checkItem`, {event: $event, mainId})" @click.stop />
          <div data-testid="MainTask" class="flex-even line-clamp-1" :class="classLimit(mainId)">{{stateUnit(``, mainId).title}}</div>
          <div data-testid="MainCount" class="flex-auto" :class="classLimit(mainId)">{{textCount(mainId)}}</div>
          <transition>
            <div class="absolute right-3 flex gap-3 slide-right theme-back-color" v-if="classItem(mainId).edit">
              <IconClone data-testid="MainClone" class="flex-auto" :class="classLimit(mainId)"
                @click="$emit(`copyItem`, {event: $event, mainId})" />
              <IconMove data-testid="MainMove" class="flex-auto" :class="classLimit(mainId)"
                @click="$emit(`moveItem`, {event: $event, mainId})" />
              <IconTrash data-testid="MainTrash" class="flex-auto" :class="classLimit(mainId)"
                @click="$emit(`deleteItem`, {event: $event, mainId})" />
            </div>
          </transition>
        </li>
      </transition-group>
    </ClientOnly>
  </ul>
  <router-view v-slot="slot">
    <transition>
      <component :is="slot?.Component" />
    </transition>
  </router-view>
</div>
</template>
