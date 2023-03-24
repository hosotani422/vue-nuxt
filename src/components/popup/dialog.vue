<script setup lang='ts'>
import app from '@/stores/page/app';
import dialog from '@/stores/popup/dialog';
</script>

<template>
<PopupModal :open="dialog.state.open">
  <div class="whitespace-pre-line flex-auto" v-if="dialog.state.title">{{dialog.state.title}}</div>
  <div class="flex flex-col gap-3 overflow-auto">
    <div class="whitespace-pre-line break-all" v-if="dialog.state.message">{{dialog.state.message}}</div>
    <InputTextbox class="border-solid border-b-[0.1rem] border-b-theme-fine" :placeholder="dialog.state.text.placeholder"
      v-focus v-model="dialog.state.text.value" v-if="dialog.state.mode === `text`" />
    <InputCheck v-if="dialog.state.mode === `check` && dialog.state.check.all"
      :modelValue="dialog.getter.stateCheckAll()"
      @change="dialog.action.clickCheckAll({event: $event})">{{app.getter.lang().dialog.select.all}}</InputCheck>
    <InputCheck :key="`check${checkId}`"
      v-for="checkId of dialog.state.check.sort" v-if="dialog.state.mode === `check`"
      v-model="dialog.state.check.data[checkId]!.check">{{dialog.state.check.data[checkId]!.title}}</InputCheck>
    <InputRadio value="" :label="app.getter.lang().dialog.select.none"
      v-if="dialog.state.mode === `radio` && dialog.state.radio.none">{{dialog.state.radio.select}}</InputRadio>
    <InputRadio :value="radioId" v-if="dialog.state.mode === `radio`"
      :key="`radio${radioId}`" v-for="radioId of dialog.state.radio.sort"
      v-model="dialog.state.radio.select">{{dialog.state.radio.data[radioId]!.title}}</InputRadio>
  </div>
  <div class="flex items-center justify-end gap-4">
    <InputButton class="flex-auto text-theme-fine"
      @click="dialog.prop.callback.cancel!()">{{dialog.state.cancel}}</InputButton>
    <InputButton class="flex-auto text-theme-warn" v-if="dialog.state.mode !== `alert`"
      @click="dialog.prop.callback.ok!()">{{dialog.state.ok}}</InputButton>
  </div>
</PopupModal>
</template>
