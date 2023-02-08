<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: `button`,
      validator(value: string) {
        return [`button`, `reset`, `submit`].includes(value);
      },
    },
  },
});
</script>

<template>
<PartBase
  class="inputButton"
  tag="button"
  :type="type"
  v-bind="$attrs"
>
  <slot>ボタン</slot>
</PartBase>
</template>

<style lang='scss' scoped>
.inputButton {
  user-select: none;
  margin: 0;
  padding: 0;
  height: 2rem;
  font-size: 1rem;
  color: $color-state-fine;
  background: transparent;
  border: none;
  outline: none;
}
</style>
