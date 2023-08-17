<script setup lang='ts'>
defineOptions({
  inheritAttrs: false,
});
withDefaults(defineProps<{
  type?: `text` | `password`;
  modelValue?: string;
}>(), {
  type: `text`,
  modelValue: ``,
});
const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
const updateValue = ($event: Event): void => {
  emit(`update:modelValue`, ($event.target as HTMLInputElement).value);
};
</script>

<template>
<input
  class="m-0 p-0 h-8 text-base bg-transparent border-0 outline-0 placeholder:text-theme-half"
  :type="type"
  :value="modelValue"
  @input="updateValue($event)"
  v-bind="$attrs" />
</template>
