<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: ``,
    },
  },
  emits: {
    'update:modelValue': (_value: string) => true,
  },
});
</script>

<template>
<PartLayout
  class="inputRadio flex align-center gap-l"
  tag="label"
>
  <PartBase
    class="input"
    tag="input"
    type="radio"
    :checked="modelValue === $attrs.value"
    @change="$emit(`update:modelValue`, $event.target.value)"
    v-bind="$attrs"
  />
  <slot />
</PartLayout>
</template>

<style lang='scss' scoped>
.inputRadio {
  user-select: none;
  > .input {
    appearance: none;
    position: relative;
    z-index: 2;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: 0.1rem solid $color-line-light;
    border-radius: 50%;
    &:checked:before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0.5rem;
      left: 0.5rem;
      width: 0.8rem;
      height: 0.8rem;
      background: $color-state-fine;
      border-radius: 50%;
    }
  }
}
</style>
