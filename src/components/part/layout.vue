<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: `div`,
    },
  },
});
</script>

<template>
<PartText
  class="partLayout"
  :tag="tag"
  v-bind="$attrs"
>
  <slot />
</PartText>
</template>

<style lang='scss' scoped>
.partLayout {
  &.flex {
    display: flex;
  }
  &.inline-flex {
    display: inline-flex;
  }
  &.row {
    flex-direction: row;
  }
  &.row-reverse {
    flex-direction: row-reverse;
  }
  &.column {
    flex-direction: column;
  }
  &.column-reverse {
    flex-direction: column-reverse;
  }
  &.align-start {
    align-items: flex-start;
  }
  &.align-center {
    align-items: center;
  }
  &.align-end {
    align-items: flex-end;
  }
  &.justify-start {
    justify-content: flex-start;
  }
  &.justify-center {
    justify-content: center;
  }
  &.justify-end {
    justify-content: flex-end;
  }
  &.gap-s {
    gap: 0.25rem;
  }
  &.gap-m {
    gap: 0.5rem;
  }
  &.gap-l {
    gap: 0.75rem;
  }
  &.gap-2l {
    gap: 1rem;
  }
  &.wrap {
    flex-wrap: wrap;
  }
  .light & {
    color: $color-font-light;
  }
  .dark & {
    color: $color-font-dark;
  }
}
</style>
