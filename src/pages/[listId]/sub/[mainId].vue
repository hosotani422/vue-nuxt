<script setup lang='ts'>
import * as Vue from 'vue';
import app from '@/stores/page/app';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';
const home = ref<Vue.ComponentPublicInstance<any>>();
const wrap = ref<Vue.ComponentPublicInstance<any>>();
const items = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
const titles = ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>({});
sub.ref.home = home;
sub.ref.wrap = wrap;
sub.ref.items = items;
sub.ref.titles = titles;
</script>

<template>
<PartLayout class="pageSub" @touchstart.capture="sub.action.switchEdit()"
  @touchstart.self="sub.action.swipeInit({event: $event})"
  @touchmove="sub.action.dragStart({event: $event}), sub.action.dragMove({event: $event}),
    sub.action.swipeStart({event: $event}), sub.action.swipeMove({event: $event})"
  @touchend="sub.action.dragEnd(), sub.action.swipeEnd({event: $event})">
  <PartLayout class="home flex column" ref="home">
    <PartLayout class="head auto flex align-center padding-l gap-l">
      <IconRight class="auto" @click="app.action.routerBack()" />
      <InputTextbox class="even font-l"
        :placeholder="app.getter.lang().placeholder.main" v-model="main.getter.stateUnit().title" />
      <IconMode class="auto" @click="sub.action.switchItem()" />
    </PartLayout>
    <PartLayout class="body even padding-l scrollXY">
      <transition mode="out-in">
        <InputTextarea class="input width-full height-full fade-normal"
          :placeholder="app.getter.lang().placeholder.memo" v-if="!main.getter.stateUnit().task"
          :modelValue="sub.getter.textMemo()" @input="sub.action.inputMemo({event: $event})" />
        <PartLayout tag="ul" ref="wrap" class="fade-normal" v-else>
          <transition-group>
            <PartLayout tag="li"
              :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {items[subId] = el;}}"
              :key="`list${app.getter.listId()}main${app.getter.mainId()}sub${subId}`"
              class="itemSub flex align-start padding-l gap-l border-bottom-m scale-up"
              :class="sub.getter.classItem(subId)" v-for="(subId, index) of sub.getter.stateFull().sort">
              <InputCheck class="auto" :modelValue="sub.getter.stateUnit(``, ``, subId).check"
                @change="sub.action.checkItem({event: $event, subId})" />
              <InputTextarea
                :ref="(el: Vue.ComponentPublicInstance<any>) => {if (el) {titles[subId] = el;}}"
                class="even padding-none"
                :placeholder="app.getter.lang().placeholder.sub"
                :modelValue="sub.getter.stateUnit(``, ``, subId).title"
                @click="sub.action.switchEdit({subId})"
                @keydown.enter.prevent="sub.action.enterItem({event: $event, subId})"
                @keydown.backspace="index > 0 && sub.action.backItem({event: $event, subId})"
                @input="sub.action.inputItem({event: $event, subId})" v-height />
              <IconDrag @touchstart="sub.action.dragInit({event: $event, subId})" />
              <transition>
                <IconTrash v-show="sub.getter.stateFull().sort.length > 1 && sub.getter.classItem(subId).edit"
                  class="option slide-right" @touchstart="sub.action.deleteItem({subId})" />
              </transition>
            </PartLayout>
          </transition-group>
        </PartLayout>
      </transition>
    </PartLayout>
    <PartLayout class="foot auto flex align-center padding-l gap-l">
      <InputTextbox class="even width-full" :class="sub.getter.classLimit()"
        :placeholder="app.getter.lang().placeholder.date" :modelValue="main.getter.stateUnit().date"
        @focus="sub.action.openCalendar({date: main.getter.stateUnit().date})" readonly />
      <InputTextbox class="even width-full" :class="sub.getter.classLimit()"
        :placeholder="app.getter.lang().placeholder.time" :modelValue="main.getter.stateUnit().time"
        @focus="sub.action.openClock({time: main.getter.stateUnit().time})" readonly />
      <InputTextbox class="even width-full" :class="sub.getter.classLimit()"
        :placeholder="app.getter.lang().placeholder.alarm" :modelValue="sub.getter.textAlarm()"
        @focus="sub.action.openAlarm()" readonly />
    </PartLayout>
  </PartLayout>
</PartLayout>
</template>

<style lang='scss' scoped>
.pageSub {
  position: absolute;
  z-index: zindex(page);
  top: 0;
  right: 0;
  bottom: 0;
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
    transform: translateX(50%) !important;
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
    left: 57%;
    width: 43%;
    .light & {
      background: $color-grad-light;
      box-shadow: $shadow-reverse-light;
    }
    .dark & {
      background: $color-grad-dark;
      box-shadow: $shadow-reverse-dark;
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
    > .body {
      > .input {
        .light & {
          background: $color-back-light;
        }
        .dark & {
          background: $color-back-dark;
        }
      }
    }
    > .foot {
      position: relative;
      z-index: 9;
      .light & {
        background: $color-grad-light;
        box-shadow: $shadow-reverse-light;
      }
      .dark & {
        background: $color-grad-dark;
        box-shadow: $shadow-reverse-dark;
      }
    }
  }
}
.itemSub {
  overflow: hidden;
  position: relative;
  .speed1 & {
    transition: height 1s, padding 1s, box-shadow 1s, transform 1s;
  }
  .speed2 & {
    transition: height 0.5s, padding 0.5s, box-shadow 0.5s, transform 0.5s;
  }
  .speed3 & {
    transition: height 0.25s, padding 0.25s, box-shadow 0.25s, transform 0.25s;
  }
  .light & {
    background: $color-back-light;
  }
  .dark & {
    background: $color-back-dark;
  }
  &.check {
    text-decoration: line-through;
    opacity: 0.5;
  }
  &.edit, &.drag {
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
