<script setup lang="ts">
import storeNotice from "@/store/popup/notice";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  notice: typeof storeNotice;
}>();
</script>

<template>
  <transition>
    <div
      v-show="notice.state.open"
      aria-label="notice"
      class="theme-color-back theme-shadow-outer anime-slide-notice absolute inset-x-3 bottom-3 z-[80] flex items-center rounded-sm p-3"
    >
      <main class="flex-1 text-xs">{{ notice.state.message }}</main>
      <InputButton class="flex-initial text-theme-fine" @click="notice.refer.callback()">{{
        notice.state.button
      }}</InputButton>
    </div>
  </transition>
</template>
