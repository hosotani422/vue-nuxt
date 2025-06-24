<script setup lang="ts">
import app from "@/store/page/app";
defineOptions({
  inheritAttrs: false,
});
withDefaults(
  defineProps<{
    modelValue?: boolean;
  }>(),
  {
    modelValue: false,
  },
);
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<template>
  <label class="flex select-none items-center gap-3" v-bind="app.render.attrClass({ attrs: $attrs })">
    <input
      type="checkbox"
      class="relative z-[2] size-8 appearance-none border-[0.1rem] border-solid border-theme-half bg-transparent before:absolute before:left-[0.56rem] before:top-[0.2rem] before:z-[1] before:h-[1.1rem] before:w-[0.7rem] before:rotate-45 before:border-solid before:border-theme-fine checked:before:border-b-[0.2rem] checked:before:border-r-[0.2rem]"
      v-bind="app.render.attrAlmost({ attrs: $attrs })"
      :checked="modelValue"
      @change="emit(`update:modelValue`, ($event.target as HTMLInputElement).checked)"
    />
    <slot />
  </label>
</template>
