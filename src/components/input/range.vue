<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: {
    'update:modelValue': (_value: number) => true,
  },
});
</script>

<template>
<PartBase
  class="inputRange"
  tag="input"
  type="range"
  :value="modelValue"
  @input="$emit(`update:modelValue`, Number($event.target.value))"
  v-bind="$attrs"
/>
</template>

<style lang='scss' scoped>
.inputRange {
  appearance: none;
  height: 0.1rem;
  background: $color-line-light;
  &:-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: $color-state-fine;
    border-radius: 50%;
  }
}
</style>
