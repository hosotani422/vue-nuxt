<script setup lang='ts'>
defineOptions({
  inheritAttrs: false,
});
withDefaults(defineProps<{
  modelValue?: string;
}>(), {
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
<textarea
  class="resize-none overflow-auto m-0 p-2 leading-8 text-base
    bg-transparent border-0 outline-0 placeholder:text-theme-half"
  v-text="modelValue"
  @input="updateValue($event)"
  v-bind="$attrs" />
</template>
