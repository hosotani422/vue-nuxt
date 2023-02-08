<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
});
</script>

<template>
<PartLayout
  class="inputFile"
  tag="label"
>
  <PartBase v-bind="$attrs"
    class="input"
    tag="input"
    type="file"
  />
  <InputButton :class="$attrs.class">
    <slot>ファイル選択</slot>
  </InputButton>
</PartLayout>
</template>

<style lang='scss' scoped>
.inputFile {
  position: relative;
  z-index: 1;
  > .input {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
}
</style>
