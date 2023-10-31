<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <label data-testid="InputFileLabel" class="relative z-[1]">
    <input data-testid="InputFile" class="absolute inset-0 z-[2] opacity-0" type="file" v-bind="$attrs" />
    <InputButton data-testid="InputFileButton" :class="$attrs.class">
      <slot>InputFile</slot>
    </InputButton>
  </label>
</template>
