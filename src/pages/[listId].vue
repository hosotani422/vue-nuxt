<script setup lang='ts'>
import * as Vue from 'vue';
import * as app from '@/composables/page/app';
import * as list from '@/composables/page/list';
import * as main from '@/composables/page/main';
const wrap = ref<Vue.ComponentPublicInstance<HTMLElement>>();
const items = ref<{[K: string]: Vue.ComponentPublicInstance<HTMLElement>;}>({});
main.ref.wrap = wrap;
main.ref.items = items;
</script>

<template>
<PartLayout class="pageMain flex column" @click="main.action.switchEdit()"
  @touchmove="main.action.dragStart({event: $event}), main.action.dragMove({event: $event})"
  @touchend="main.action.dragEnd()">
  <PartLayout class="head auto flex align-center padding-l gap-l">
    <IconList class="auto" @click="app.action.routerList()" />
    <InputTextbox class="even font-l"
      :placeholder="app.getter.lang().placeholder.list" v-model="list.getter.stateUnit().title" />
    <IconConf class="auto" @click="app.action.routerConf()" />
    <IconPlus class="auto" @click="main.action.insertItem()" />
  </PartLayout>
  <PartLayout tag="ul" ref="wrap" class="even padding-l scrollXY select-none">
    <transition-group appear>
      <PartLayout tag="li"
        :ref="(el: Vue.ComponentPublicInstance<HTMLElement>) => {if (el) {items[mainId] = el;}}"
        :key="`list${app.getter.listId()}main${mainId}`" v-for="mainId of main.getter.stateFull().sort"
        class="itemMain flex align-center padding-l gap-l border-bottom-m scale-up"
        :class="main.getter.classItem(mainId)" @contextmenu.prevent
        @click="main.state.status[mainId] !== `edit` && app.action.routerSub({mainId})"
        @touchlong="main.action.switchEdit({mainId}), main.action.dragInit({event: $event, mainId})">
        <InputCheck class="auto" :modelValue="main.getter.stateUnit(``, mainId).check"
          @change="main.action.checkItem({event: $event, mainId})" @click.stop />
        <PartText class="even ellipsis" :class="main.getter.classLimit(mainId)">
          {{main.getter.stateUnit(``, mainId).title}}</PartText>
        <PartText class="auto" :class="main.getter.classLimit(mainId)">
          {{main.getter.textCount(mainId)}}</PartText>
        <transition>
          <PartLayout class="option flex gap-l slide-right" v-show="main.getter.classItem(mainId).edit">
            <IconClone class="auto" :class="main.getter.classLimit(mainId)"
              @click="main.action.copyItem({event: $event, mainId})" />
            <IconMove class="auto" :class="main.getter.classLimit(mainId)"
              @click="main.action.moveItem({event: $event, mainId})" />
            <IconTrash class="auto" :class="main.getter.classLimit(mainId)"
              @click="main.action.deleteItem({event: $event, mainId})" />
          </PartLayout>
        </transition>
      </PartLayout>
    </transition-group>
  </PartLayout>
  <router-view v-slot="{Component}">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</PartLayout>
</template>

<style lang='scss' scoped>
.pageMain {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .light & {
    background: $color-grad-light;
  }
  .dark & {
    background: $color-grad-dark;
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
.itemMain {
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
  &.check {
    opacity: 0.5;
    > .partText {
      text-decoration: solid line-through 0.1rem;
    }
  }
  &.edit, &.drag {
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
