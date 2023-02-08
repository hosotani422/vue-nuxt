<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (_value: boolean) => true,
  },
});
</script>

<template>
<PartLayout
  class="inputCheck flex align-center gap-l"
  tag="label"
>
  <PartBase
    class="input"
    tag="input"
    type="checkbox"
    :checked="modelValue"
    @change="$emit(`update:modelValue`, $event.target.checked)"
    v-bind="$attrs"
  />
  <slot />
</PartLayout>
</template>

<style lang='scss' scoped>
.inputCheck {
  user-select: none;
  > .input {
    appearance: none;
    position: relative;
    z-index: 2;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: 0.1rem solid $color-line-light;
    &:checked:before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0.2rem;
      left: 0.56rem;
      width: 0.7rem;
      height: 1.1rem;
      border-right: solid 0.2rem $color-state-fine;
      border-bottom: solid 0.2rem $color-state-fine;
      transform: rotate(45deg);
    }
  }
}
</style>
