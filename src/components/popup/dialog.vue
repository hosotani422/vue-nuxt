<script setup lang='ts'>
import * as app from '@/composables/page/app';
import * as dialog from '@/composables/popup/dialog';
</script>

<template>
<PopupModal class="popupDialog" :open="dialog.state.open">
  <PartText class="head auto" v-if="dialog.state.title">{{dialog.state.title}}</PartText>
  <PartLayout class="body flex column gap-l scrollXY">
    <PartText class="label" v-if="dialog.state.message">{{dialog.state.message}}</PartText>
    <InputTextbox class="text" :placeholder="dialog.state.text.placeholder"
      v-focus v-model="dialog.state.text.value" v-if="dialog.state.mode === `text`" />
    <InputCheck class="check block" v-if="dialog.state.mode === `check` && dialog.state.check.all"
      :modelValue="dialog.getter.stateCheckAll()"
      @change="dialog.action.clickCheckAll({event: $event})">{{app.getter.lang().dialog.select.all}}</InputCheck>
    <InputCheck class="check block" :key="`check${checkId}`"
      v-for="checkId of dialog.state.check.sort" v-if="dialog.state.mode === `check`"
      v-model="dialog.state.check.data[checkId]!.check">{{dialog.state.check.data[checkId]!.title}}</InputCheck>
    <InputRadio class="radio block" value="" :label="app.getter.lang().dialog.select.none"
      v-if="dialog.state.mode === `radio` && dialog.state.radio.none">{{dialog.state.radio.select}}</InputRadio>
    <InputRadio class="radio block" :value="radioId" v-if="dialog.state.mode === `radio`"
      :key="`radio${radioId}`" v-for="radioId of dialog.state.radio.sort"
      v-model="dialog.state.radio.select">{{dialog.state.radio.data[radioId]!.title}}</InputRadio>
  </PartLayout>
  <PartLayout class="flex align-center justify-end gap-2l">
    <InputButton class="auto"
      @click="dialog.variable.callback.cancel!()">{{dialog.state.cancel}}</InputButton>
    <InputButton class="auto error" v-if="dialog.state.mode !== `alert`"
      @click="dialog.variable.callback.ok!()">{{dialog.state.ok}}</InputButton>
  </PartLayout>
</PopupModal>
</template>

<style lang='scss' scoped>
.popupDialog {
  ::v-deep(.head) {
    white-space: pre-line;
  }
  ::v-deep(.body) {
    > .label {
      white-space: pre-line;
      word-break: break-all;
    }
    > .text {
      border-bottom: 0.1rem solid $color-state-fine;
    }
  }
}
</style>
