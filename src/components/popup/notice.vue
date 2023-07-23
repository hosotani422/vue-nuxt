<script setup lang='ts'>
import notice from '@/stores/popup/notice';
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  state: typeof notice.state;
}>();
</script>

<template>
<transition>
  <div v-show="state.open"
    class="absolute z-[80] right-3 bottom-3 left-3 flex items-center p-3 rounded
    speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
    active:transition-transform fromto:!translate-y-[4rem] theme-back-color theme-shadow-normal">
    <div class="flex-even text-xs">{{state.message}}</div>
    <InputButton data-testid="NoticeBack" class="flex-auto text-theme-fine"
      @click="state.callback()">{{state.button}}</InputButton>
  </div>
</transition>
</template>
