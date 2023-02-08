<script setup lang='ts'>
import * as notice from '@/composables/popup/notice';
</script>

<template>
<transition>
  <PartLayout class="popupNotice flex align-center padding-l" v-if="notice.state.open">
    <PartText class="even font-s">{{notice.state.message}}</PartText>
    <InputButton class="auto" @click="notice.variable.callback()">{{notice.state.button}}</InputButton>
  </PartLayout>
</transition>
</template>

<style lang='scss' scoped>
.popupNotice {
  position: absolute;
  z-index: zindex(modeless);
  right: 0.75rem;
  bottom: 0.75rem;
  left: 0.75rem;
  border-radius: 0.2rem;
  &.v-enter-active, &.v-leave-active {
    .speed1 & {
      transition: transform 1s;
    }
    .speed2 & {
      transition: transform 0.5s;
    }
    .speed3 & {
      transition: transform 0.25s;
    }
  }
  &.v-enter-from, &.v-leave-to {
    transform: translateY(4rem) !important;
  }
  .light & {
    background: $color-back-light;
    box-shadow: $shadow-normal-light;
  }
  .dark & {
    background: $color-back-dark;
    box-shadow: $shadow-normal-dark;
  }
}
</style>
