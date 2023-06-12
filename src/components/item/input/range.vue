<script setup lang='ts'>
defineOptions({
  inheritAttrs: false,
});
withDefaults(defineProps<{
  modelValue: number;
}>(), {
  modelValue: 0,
});
const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();
const updateValue = ($event: Event): void => {
  emit(`update:modelValue`, Number(($event.target as HTMLInputElement).value));
};
</script>

<template>
<input
  class="appearance-none h-[0.1rem] bg-theme-half"
  type="range"
  :value="modelValue"
  @input="updateValue($event)"
  v-bind="$attrs" />
</template>
