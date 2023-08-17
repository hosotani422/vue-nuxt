<script setup lang='ts'>
defineOptions({
  inheritAttrs: false,
});
withDefaults(defineProps<{
  type?: `button` | `reset` | `submit`;
}>(), {
  type: `button`,
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
