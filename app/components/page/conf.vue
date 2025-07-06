<script setup lang="ts">
import i18next from "i18next";
import storeApp from "@/store/page/app";
import storeConf from "@/store/page/conf";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  app: typeof storeApp;
  conf: typeof storeConf;
}>();
</script>

<template>
  <div
    aria-label="conf"
    class="theme-color-mask anime-slide-conf absolute inset-x-0 bottom-0 z-10 h-[200%] select-none"
    @touchmove="
      conf.handle.swipeStart({ x: $event.changedTouches[0]!.clientX, y: $event.changedTouches[0]!.clientY });
      conf.handle.swipeMove({ y: $event.changedTouches[0]!.clientY });
    "
    @mousemove="
      conf.handle.swipeStart({ x: $event.clientX, y: $event.clientY });
      conf.handle.swipeMove({ y: $event.clientY });
    "
    @touchend="conf.handle.swipeEnd({ y: $event.changedTouches[0]!.clientY })"
    @mouseup="conf.handle.swipeEnd({ y: $event.clientY })"
  >
    <aside
      class="absolute inset-x-0 top-0 z-[1] h-[55%]"
      @touchstart="
        conf.handle.swipeInit({ x: $event.changedTouches[0]!.clientX, y: $event.changedTouches[0]!.clientY })
      "
      @mousedown="conf.handle.swipeInit({ x: $event.clientX, y: $event.clientY })"
    />
    <div
      :key="app.state.updateKey"
      class="theme-color-grad theme-shadow-outer absolute inset-x-0 bottom-0 z-[1] flex h-[45%] flex-col"
    >
      <header class="theme-color-grad theme-shadow-outer relative z-[9] flex flex-initial items-center gap-3 p-3">
        <IconArrow class="flex-initial rotate-90" @click="app.handle.routerBack()" />
        <h2 class="flex-1 text-xl">{{ i18next.t(`conf.title`) }}</h2>
        <p class="flex-initial">
          {{ `${app.refer.constant.app.name} ${app.refer.constant.app.version}` }}
        </p>
      </header>
      <main class="flex-1 overflow-auto p-3">
        <ul>
          <li
            class="theme-color-border theme-color-back flex h-16 items-center gap-3 border-b-[0.1rem] border-solid p-3"
          >
            <h3 class="flex-[0_1_5rem]">{{ i18next.t(`conf.size.title`) }}</h3>
            <InputRange v-model="conf.state.data.size" class="flex-1" :min="1" :max="3" :step="1" />
            <p class="flex-initial">
              {{ i18next.t(`conf.size.value.${conf.state.data.size}`) }}
            </p>
          </li>
          <li
            class="theme-color-border theme-color-back flex h-16 items-center gap-3 border-b-[0.1rem] border-solid p-3"
          >
            <h3 class="flex-[0_1_5rem]">{{ i18next.t(`conf.speed.title`) }}</h3>
            <InputRange v-model="conf.state.data.speed" class="flex-1" :min="1" :max="3" :step="1" />
            <p class="flex-initial">
              {{ i18next.t(`conf.speed.value.${conf.state.data.speed}`) }}
            </p>
          </li>
          <li
            class="theme-color-border theme-color-back flex h-16 items-center gap-3 border-b-[0.1rem] border-solid p-3"
          >
            <h3 class="flex-1">{{ i18next.t(`conf.theme.title`) }}</h3>
            <InputRadio v-model="conf.state.data.theme" class="flex-initial" value="light">{{
              i18next.t(`conf.theme.value.light`)
            }}</InputRadio>
            <InputRadio v-model="conf.state.data.theme" class="flex-initial" value="dark">{{
              i18next.t(`conf.theme.value.dark`)
            }}</InputRadio>
          </li>
          <li
            class="theme-color-border theme-color-back flex h-16 items-center gap-3 border-b-[0.1rem] border-solid p-3"
          >
            <h3 class="flex-1">{{ i18next.t(`conf.lang.title`) }}</h3>
            <InputRadio v-model="conf.state.data.lang" class="flex-initial" value="en">{{
              i18next.t(`conf.lang.value.en`)
            }}</InputRadio>
            <InputRadio v-model="conf.state.data.lang" class="flex-initial" value="ja">{{
              i18next.t(`conf.lang.value.ja`)
            }}</InputRadio>
          </li>
          <li
            class="theme-color-border theme-color-back flex h-16 items-center gap-3 border-b-[0.1rem] border-solid p-3"
          >
            <h3 class="flex-1">{{ i18next.t(`conf.vibrate.title`) }}</h3>
            <InputRadio v-model="conf.state.data.vibrate" class="flex-initial" value="off">{{
              i18next.t(`conf.vibrate.value.off`)
            }}</InputRadio>
            <InputRadio v-model="conf.state.data.vibrate" class="flex-initial" value="on">{{
              i18next.t(`conf.vibrate.value.on`)
            }}</InputRadio>
          </li>
          <li
            class="theme-color-border theme-color-back flex h-16 items-center gap-3 border-b-[0.1rem] border-solid p-3"
          >
            <h3 class="flex-1">{{ i18next.t(`conf.save.title`) }}</h3>
            <a
              class="flex-[0_1_3rem] text-theme-fine"
              @click="conf.handle.saveLocal({ elem: $event.currentTarget as HTMLElement })"
            >
              <InputButton>{{ i18next.t(`conf.save.local`) }}</InputButton>
            </a>
            <InputButton class="flex-[0_1_3rem] text-theme-warn" @click="conf.handle.saveServer()">{{
              i18next.t(`conf.save.server`)
            }}</InputButton>
          </li>
          <li
            class="theme-color-border theme-color-back flex h-16 items-center gap-3 border-b-[0.1rem] border-solid p-3"
          >
            <h3 class="flex-1">{{ i18next.t(`conf.load.title`) }}</h3>
            <InputFile
              class="flex-[0_1_3rem] text-theme-fine"
              @change="conf.handle.loadLocal({ files: $event.target.files })"
              >{{ i18next.t(`conf.load.local`) }}</InputFile
            >
            <InputButton class="flex-[0_1_3rem] text-theme-warn" @click="conf.handle.loadServer()">{{
              i18next.t(`conf.load.server`)
            }}</InputButton>
          </li>
          <li
            class="theme-color-border theme-color-back flex h-16 items-center gap-3 border-b-[0.1rem] border-solid p-3"
          >
            <h3 class="flex-1">{{ i18next.t(`conf.reset.title`) }}</h3>
            <InputButton class="flex-[0_1_2rem] text-theme-fine" @click="conf.handle.resetConf()">{{
              i18next.t(`conf.reset.conf`)
            }}</InputButton>
            <InputButton class="flex-[0_1_2rem] text-theme-warn" @click="conf.handle.resetList()">{{
              i18next.t(`conf.reset.list`)
            }}</InputButton>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>
