<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <InputButton class="relative z-[1]" v-bind="$attrs">
    <input class="absolute inset-0 z-[2] opacity-0" type="file" />
    <slot />
  </InputButton>
</template>
