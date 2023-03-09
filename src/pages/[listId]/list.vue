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
<PartLayout class="pageList"
  @click="list.action.switchEdit()"
  @touchstart.self="list.action.swipeInit({event: $event})"
  @touchmove="list.action.dragStart({event: $event}), list.action.dragMove({event: $event}),
    list.action.swipeStart({event: $event}), list.action.swipeMove({event: $event})"
  @touchend="list.action.dragEnd(), list.action.swipeEnd({event: $event})">
  <PartLayout class="home flex column">
    <PartLayout class="head auto flex align-center padding-l gap-l">
      <IconPlus class="auto" @click="list.action.insertItem()" />
      <PartText class="even font-l ellipsis">{{constant.base.title}}</PartText>
      <IconLeft class="auto" @click="app.action.routerBack()" />
    </PartLayout>
    <PartLayout tag="ul" ref="wrap" class="even padding-l scrollXY select-none">
      <transition-group>
        <PartLayout tag="li"
          :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[listId] = el;}}"
          :key="`list${listId}`" v-for="listId of list.getter.stateFull().sort"
          class="itemList flex align-center padding-l gap-l border-bottom-m scale-up"
          :class="list.getter.classItem(listId)"
          @touchlong="list.action.switchEdit({listId}), list.action.dragInit({event: $event, listId})"
          @click="list.state.status[listId] !== `edit` && app.action.routerBack({listId})"
          @contextmenu.prevent>
          <component :is="list.getter.iconType(listId)" />
          <PartText class="even ellipsis" :class="list.getter.classLimit(listId)">
            {{list.getter.stateUnit(listId).title}}</PartText>
          <PartText class="auto" :class="list.getter.classLimit(listId)">
            {{list.getter.textCount(listId)}}</PartText>
          <transition>
            <PartLayout class="option flex gap-l slide-right" v-show="list.getter.classItem(listId).edit">
              <IconClone v-if="listId !== constant.base.id.trash"
                :class="list.getter.classLimit(listId)" @click="list.action.copyItem({event: $event, listId})" />
              <IconTrash v-if="listId !== app.getter.listId() && listId !== constant.base.id.trash"
                :class="list.getter.classLimit(listId)" @click="list.action.deleteItem({event: $event, listId})" />
            </PartLayout>
          </transition>
        </PartLayout>
      </transition-group>
    </PartLayout>
  </PartLayout>
</PartLayout>
</template>

<style lang='scss' scoped>
.pageList {
  position: absolute;
  z-index: zindex(page);
  top: 0;
  bottom: 0;
  left: 0;
  width: 200%;
  &.v-enter-active, &.v-leave-active {
    .speed1 & {
      transition: transform 1s, background 1s;
    }
    .speed2 & {
      transition: transform 0.5s, background 0.5s;
    }
    .speed3 & {
      transition: transform 0.25s, background 0.25s;
    }
  }
  &.v-enter-from, &.v-leave-to {
    transform: translateX(-50%) !important;
    background: transparent !important;
  }
  .light & {
    background: $color-mask-light;
  }
  .dark & {
    background: $color-mask-dark;
  }
  > .home {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    width: 43%;
    .light & {
      background: $color-grad-light;
      box-shadow: $shadow-normal-light;
    }
    .dark & {
      background: $color-grad-dark;
      box-shadow: $shadow-normal-dark;
    }
    > .head {
      position: relative;
      z-index: 9;
      .light & {
        background: $color-grad-light;
        box-shadow: $shadow-normal-light;
      }
      .dark & {
        background: $color-grad-dark;
        box-shadow: $shadow-normal-dark;
      }
    }
  }
}
.itemList {
  overflow: hidden;
  position: relative;
  height: 4rem;
  .speed1 & {
    transition: box-shadow 1s, transform 1s;
  }
  .speed2 & {
    transition: box-shadow 0.5s, transform 0.5s;
  }
  .speed3 & {
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .light & {
    background: $color-back-light;
  }
  .dark & {
    background: $color-back-dark;
  }
  &.select {
    .light & {
      box-shadow: $shadow-inner-light;
    }
    .dark & {
      box-shadow: $shadow-inner-dark;
    }
  }
  &.edit {
    position: relative;
    z-index: 1;
    transform: scale(1.03, 1.03);
    .light & {
      box-shadow: $shadow-outer-light;
    }
    .dark & {
      box-shadow: $shadow-outer-dark;
    }
  }
  > .option {
    position: absolute;
    right: 0.75rem;
    .light & {
      background: $color-back-light;
    }
    .dark & {
      background: $color-back-dark;
    }
  }
}
</style>
