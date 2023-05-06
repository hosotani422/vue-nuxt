<script lang='ts'>
import notice from '@/stores/popup/notice';
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    state: {
      type: Object as PropType<typeof notice.state>,
      required: true,
    },
  },
});
</script>

<template>
<transition>
  <div v-if="state.open"
    class="absolute z-[80] right-3 bottom-3 left-3 flex items-center p-3 rounded
    speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
    active:transition-transform fromto:!translate-y-[4rem] theme-back-color theme-shadow-normal">
    <div class="flex-even text-xs">{{state.message}}</div>
    <ItemInputButton data-test="NoticeBack" class="flex-auto text-theme-fine"
      @click="state.callback()">{{state.button}}</ItemInputButton>
  </div>
</transition>
</template>
