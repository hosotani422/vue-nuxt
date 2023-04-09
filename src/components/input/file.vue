<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
});
</script>

<template>
<label class="relative z-[1]">
  <input
    class="absolute z-[2] top-0 right-0 bottom-0 left-0 opacity-0"
    type="file"
    v-bind="$attrs" />
  <InputButton :class="$attrs.class">
    <slot>ファイル選択</slot>
  </InputButton>
</label>
</template>
