<script lang='ts'>
import * as Vue from 'vue';
import main from '@/stores/page/main';
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    refer: {
      type: Object as PropType<typeof main.refer>,
      required: true,
    },
    status: {
      type: Object,
      required: true,
    },
    lang: {
      type: Function,
      required: true,
    },
    listId: {
      type: Function,
      required: true,
    },
    listUnit: {
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
    `routerList`, `routerSub`, `routerConf`, `insertItem`, `copyItem`, `moveItem`, `deleteItem`,
    `checkItem`, `switchEdit`, `dragInit`, `dragStart`, `dragMove`, `dragEnd`,
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
<div class="absolute z-[1] top-0 right-0 bottom-0 left-0 flex flex-col theme-grad-color"
  @click="$emit(`switchEdit`)" @touchend="$emit(`dragEnd`)"
  @touchmove="$emit(`dragStart`, {event: $event}), $emit(`dragMove`, {event: $event})">
  <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
    <ItemIconList class="flex-auto" @click="$emit(`routerList`)" />
    <ClientOnly>
      <ItemInputTextbox class="flex-even text-xl"
        :placeholder="lang().placeholder.list" v-model="listUnit().title" />
    </ClientOnly>
    <ItemIconConf class="flex-auto" @click="$emit(`routerConf`)" />
    <ItemIconPlus class="flex-auto" @click="$emit(`insertItem`)" />
  </div>
  <ul ref="wrap" class="flex-even p-3 overflow-auto select-none">
    <ClientOnly>
      <transition-group appear>
        <li class="overflow-hidden relative h-16 flex items-center p-3 gap-3
          border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color scale-up
          [&.select]:theme-shadow-inner [&.check]:opacity-50 [&.check]:line-through
          [&.edit]:z-[1] [&.drag]:z-[1] [&.edit]:scale-[1.03] [&.drag]:scale-[1.03]
          [&.edit]:theme-shadow-outer [&.drag]:theme-shadow-outer [&.hide]:invisible"
          :class="classItem(mainId)" @contextmenu.prevent
          :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[mainId] = el;}}"
          :key="`list${listId()}main${mainId}`" v-for="mainId of stateFull().sort"
          @click="status[mainId] !== `edit` && $emit(`routerSub`, {mainId})"
          @touchlong="$emit(`switchEdit`, {mainId}), $emit(`dragInit`, {event: $event, mainId})">
          <ItemInputCheck class="flex-auto" :modelValue="stateUnit(``, mainId).check"
            @change="$emit(`checkItem`, {event: $event, mainId})" @click.stop />
          <div class="flex-even line-clamp-1" :class="classLimit(mainId)">{{stateUnit(``, mainId).title}}</div>
          <div class="flex-auto" :class="classLimit(mainId)">{{textCount(mainId)}}</div>
          <transition>
            <div class="absolute right-3 flex gap-3 slide-right theme-back-color" v-show="classItem(mainId).edit">
              <ItemIconClone class="flex-auto" :class="classLimit(mainId)"
                @click="$emit(`copyItem`, {event: $event, mainId})" />
              <ItemIconMove class="flex-auto" :class="classLimit(mainId)"
                @click="$emit(`moveItem`, {event: $event, mainId})" />
              <ItemIconTrash class="flex-auto" :class="classLimit(mainId)"
                @click="$emit(`deleteItem`, {event: $event, mainId})" />
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
