<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<`button` | `reset` | `submit`>,
      default: `button`,
      validator(value: string) {
        return [`button`, `reset`, `submit`].includes(value);
      },
    },
  },
});
</script>

<template>
<button
  class="select-none m-0 p-0 h-8 text-base bg-transparent border-0 outline-0"
  :type="type"
  v-bind="$attrs">
  <slot>ボタン</slot>
</button>
</template>
