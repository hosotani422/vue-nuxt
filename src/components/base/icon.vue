<script setup lang='ts'>
defineOptions({
  inheritAttrs: false,
});
withDefaults(defineProps<{
  tag?: string;
  name?: string;
  viewBox?: string;
}>(), {
  tag: `i`,
  name: ``,
  viewBox: `0 0 24 24`,
});
</script>

<template>
<component :is="tag" class="w-8" v-bind="$attrs">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :aria-labelledby="name"
    :viewBox="viewBox"
    role="presentation">
    <title :id="name" lang="en">
      {{name}} icon
    </title>
    <slot />
  </svg>
</component>
</template>
