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
<label class="select-none flex items-center gap-3">
  <input
    class="appearance-none relative z-[2] w-8 h-8 bg-transparent
      border-solid border-[0.1rem] border-theme-half rounded-full
      checked:before:absolute checked:before:z-[1]
      checked:before:top-[0.5rem] checked:before:left-[0.5rem]
      checked:before:w-[0.8rem] checked:before:h-[0.8rem]
      checked:before:bg-theme-fine checked:before:rounded-full"
    type="radio"
    :checked="modelValue === $attrs.value"
    @change="updateValue($event)"
    v-bind="$attrs" />
  <slot />
</label>
</template>
