<script setup lang="ts">
import notice from "@/stores/popup/notice";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  state: typeof notice.state;
}>();
</script>

<template>
  <transition>
    <div
      v-show="state.open"
      data-testid="NoticeRoot"
      class="theme-back-color theme-shadow-normal absolute inset-x-3 bottom-3 z-[80] flex items-center rounded p-3 active:transition-transform speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200 fromto:!translate-y-[4rem]"
    >
      <div data-testid="NoticeMessage" class="flex-even text-xs">{{ state.message }}</div>
      <InputButton data-testid="NoticeBack" class="flex-auto text-theme-fine" @click="state.callback()">{{
        state.button
      }}</InputButton>
    </div>
  </transition>
</template>
