<script setup lang='ts'>
defineOptions({
  inheritAttrs: false,
});
withDefaults(defineProps<{
  modelValue: boolean;
}>(), {
  modelValue: false,
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
const updateValue = ($event: Event): void => {
  emit(`update:modelValue`, ($event.target as HTMLInputElement).checked);
};
</script>

<template>
<label class="select-none flex items-center gap-3">
  <input
    class="appearance-none relative z-[2] w-8 h-8 bg-transparent
      border-solid border-[0.1rem] border-theme-half
      checked:before:absolute checked:before:z-[1]
      checked:before:top-[0.2rem] checked:before:left-[0.56rem]
      checked:before:w-[0.7rem] checked:before:h-[1.1rem]
      checked:before:border-r-solid checked:before:border-r-[0.2rem] checked:before:border-r-theme-fine
      checked:before:border-b-solid checked:before:border-b-[0.2rem] checked:before:border-b-theme-fine
      checked:before:rotate-45"
    type="checkbox"
    :checked="modelValue"
    @change="updateValue($event)"
    v-bind="$attrs" />
  <slot />
</label>
</template>
