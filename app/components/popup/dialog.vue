<script setup lang="ts">
import i18next from "i18next";
import storeDialog from "@/store/popup/dialog";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  dialog: typeof storeDialog;
}>();
</script>

<template>
  <PopupBase aria-label="dialog" data-testid="DialogRoot" :open="dialog.state.open">
    <header v-if="dialog.state.title" data-testid="DialogTitle" class="flex-initial whitespace-pre-line">
      {{ dialog.state.title }}
    </header>
    <main class="flex flex-1 flex-col gap-3 overflow-auto">
      <div v-if="dialog.state.message" data-testid="DialogMessage" class="flex-initial whitespace-pre-line break-all">
        {{ dialog.state.message }}
      </div>
      <template v-if="dialog.state.mode === `text`">
        <InputTextbox
          v-model="dialog.state.text!.value"
          v-focus
          data-testid="DialogText"
          class="flex-initial border-b-[0.1rem] border-solid border-b-theme-fine"
          :placeholder="dialog.state.text!.placeholder"
          @input="dialog.state.init = false"
        />
      </template>
      <template v-else-if="dialog.state.mode === `check`">
        <InputCheck
          v-if="dialog.state.check!.all"
          :model-value="dialog.render.stateCheckAll()"
          data-testid="DialogCheckAll"
          class="flex-initial"
          @change="dialog.handle.clickCheckAll({ check: ($event.target as HTMLInputElement).checked })"
          >{{ i18next.t(`dialog.select.all`) }}</InputCheck
        >
        <InputCheck
          v-for="checkId of dialog.state.check!.sort"
          :key="checkId"
          v-model="dialog.state.check!.data[checkId]!.check"
          data-testid="DialogCheck"
          class="flex-initial"
          >{{ dialog.state.check!.data[checkId]!.title }}</InputCheck
        >
      </template>
      <template v-else-if="dialog.state.mode === `radio`">
        <InputRadio
          v-if="dialog.state.radio!.none"
          v-model="dialog.state.radio!.select"
          data-testid="DialogRadioNone"
          class="flex-initial"
          value=""
          >{{ i18next.t(`dialog.select.none`) }}</InputRadio
        >
        <InputRadio
          v-for="radioId of dialog.state.radio!.sort"
          :key="radioId"
          v-model="dialog.state.radio!.select"
          data-testid="DialogRadio"
          class="flex-initial"
          :value="radioId"
          >{{ dialog.state.radio!.data[radioId]!.title }}</InputRadio
        >
      </template>
    </main>
    <div
      v-if="!dialog.state.init && dialog.render.errorValidation()"
      data-testid="DialogError"
      class="flex-initial text-theme-warn"
    >
      {{ dialog.render.errorValidation() }}
    </div>
    <footer class="flex flex-initial items-center justify-end gap-3">
      <InputButton
        data-testid="DialogCancel"
        class="flex-initial text-theme-fine"
        @click="dialog.refer.callback.cancel!()"
        >{{ dialog.state.cancel }}</InputButton
      >
      <InputButton
        v-if="dialog.state.mode !== `alert`"
        data-testid="DialogOk"
        class="flex-initial text-theme-warn"
        :disabled="!!dialog.render.errorValidation()"
        @click="dialog.refer.callback.ok!()"
        >{{ dialog.state.ok }}</InputButton
      >
    </footer>
  </PopupBase>
</template>
