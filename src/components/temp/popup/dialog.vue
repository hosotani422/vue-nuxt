<script setup lang='ts'>
import dialog from '@/stores/popup/dialog';
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  state: typeof dialog.state;
  lang: Function;
  stateCheckAll: Function;
}>();
defineEmits([
  `clickCheckAll`,
]);
</script>

<template>
<BasePopup data-testid="DialogPage" :open="state.open">
  <div class="whitespace-pre-line flex-auto" v-if="state.title">{{state.title}}</div>
  <div class="flex flex-col gap-3 overflow-auto">
    <div class="whitespace-pre-line break-all" v-if="state.message">{{state.message}}</div>
    <ItemInputTextbox data-testid="DialogTitle" class="border-solid border-b-[0.1rem] border-b-theme-fine"
      :placeholder="state.text.placeholder" v-focus v-model="state.text.value" v-if="state.mode === `text`" />
    <ItemInputCheck v-if="state.mode === `check` && state.check.all" :modelValue="stateCheckAll()"
      @change="$emit(`clickCheckAll`, {event: $event})">{{lang().dialog.select.all}}</ItemInputCheck>
    <ItemInputCheck data-testid="DialogCheck" :key="`check${checkId}`" v-for="checkId of state.check.sort" v-if="state.mode === `check`"
      v-model="state.check.data[checkId]!.check">{{state.check.data[checkId]!.title}}</ItemInputCheck>
    <ItemInputRadio value="" :label="lang().dialog.select.none"
      v-if="state.mode === `radio` && state.radio.none">{{state.radio.select}}</ItemInputRadio>
    <ItemInputRadio data-testid="DialogRadio" :value="radioId" v-if="state.mode === `radio`" v-for="radioId of state.radio.sort"
      :key="`radio${radioId}`" v-model="state.radio.select">{{state.radio.data[radioId]!.title}}</ItemInputRadio>
  </div>
  <div class="flex items-center justify-end gap-4">
    <ItemInputButton data-testid="DialogCancel" class="flex-auto text-theme-fine"
      @click="state.callback.cancel!()">{{state.cancel}}</ItemInputButton>
    <ItemInputButton data-testid="DialogOk" class="flex-auto text-theme-warn" v-if="state.mode !== `alert`"
      @click="state.callback.ok!()">{{state.ok}}</ItemInputButton>
  </div>
</BasePopup>
</template>
