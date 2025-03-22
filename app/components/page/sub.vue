<script setup lang="ts">
import i18next from "i18next";
import storeApp from "@/store/page/app";
import storeMain from "@/store/page/main";
import storeSub from "@/store/page/sub";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  app: typeof storeApp;
  main: typeof storeMain;
  sub: typeof storeSub;
}>();
</script>

<template>
  <div
    aria-label="sub"
    data-id="SubRoot"
    data-testid="SubRoot"
    class="theme-color-mask anime-slide-sub absolute inset-y-0 right-0 z-10 w-[200%]"
    @touchmove="
      sub.handle.dragStart();
      sub.handle.dragMove({ y: $event.changedTouches[0]!.clientY });
      sub.handle.swipeStart({ x: $event.changedTouches[0]!.clientX, y: $event.changedTouches[0]!.clientY });
      sub.handle.swipeMove({ x: $event.changedTouches[0]!.clientX });
    "
    @mousemove="
      sub.handle.dragStart();
      sub.handle.dragMove({ y: $event.clientY });
      sub.handle.swipeStart({ x: $event.clientX, y: $event.clientY });
      sub.handle.swipeMove({ x: $event.clientX });
    "
    @touchend="
      sub.handle.dragEnd();
      sub.handle.swipeEnd({ x: $event.changedTouches[0]!.clientX });
    "
    @mouseup="
      sub.handle.dragEnd();
      sub.handle.swipeEnd({ x: $event.clientX });
    "
  >
    <aside
      data-testid="SubBack"
      class="absolute inset-y-0 left-0 z-[1] w-[57%]"
      @touchstart="sub.handle.swipeInit({ x: $event.changedTouches[0]!.clientX, y: $event.changedTouches[0]!.clientY })"
      @mousedown="sub.handle.swipeInit({ x: $event.clientX, y: $event.clientY })"
    />
    <div
      data-id="SubHome"
      data-testid="SubHome"
      class="theme-color-grad theme-shadow-outer absolute inset-y-0 right-0 z-[1] flex w-[43%] flex-col"
    >
      <header
        data-testid="SubHead"
        class="theme-color-grad theme-shadow-outer relative z-[9] flex flex-initial items-center gap-3 p-3"
      >
        <IconArrow data-testid="SubRight" class="flex-initial" @click="app.handle.routerBack()" />
        <InputTextbox
          v-model="main.state.data[app.render.listId()]!.data[app.render.mainId()]!.title"
          data-testid="SubTitle"
          class="flex-1 text-xl"
          :placeholder="i18next.t(`placeholder.main`)"
        />
        <IconMode data-testid="SubMode" class="flex-initial" @click="sub.handle.toggleMode()" />
      </header>
      <main data-testid="SubBody" class="flex-1 overflow-auto p-3">
        <transition mode="out-in">
          <InputTextarea
            v-if="!main.state.data[app.render.listId()]!.data[app.render.mainId()]!.task"
            data-testid="SubMemo"
            class="theme-color-back anime-fade-item size-full"
            :placeholder="i18next.t(`placeholder.memo`)"
            :model-value="sub.render.textMemo()"
            @input="sub.handle.convertItem({ text: ($event.target as HTMLInputElement).value })"
          />
          <ul v-else data-id="SubBody" class="anime-fade-item">
            <transition-group>
              <li
                v-for="(subId, index) of sub.state.data[app.render.listId()]!.data[app.render.mainId()]!.sort"
                :key="subId"
                :data-id="`SubItem${subId}`"
                data-testid="SubItem"
                class="theme-color-border theme-color-back trans-select-text trans-edit-item trans-check-item anime-scale-item group relative flex items-start gap-3 overflow-hidden border-b-[0.1rem] border-solid p-3"
                :class="sub.render.classStatus({ subId })"
              >
                <InputCheck
                  v-model="sub.state.data[app.render.listId()]!.data[app.render.mainId()]!.data[subId]!.check"
                  data-testid="SubCheck"
                  class="peer/check flex-initial"
                />
                <InputTextarea
                  v-model="sub.state.data[app.render.listId()]!.data[app.render.mainId()]!.data[subId]!.title"
                  :data-id="`SubTask${subId}`"
                  data-testid="SubTask"
                  class="peer/text flex-1 p-0!"
                  :placeholder="i18next.t(`placeholder.sub`)"
                  :resize="true"
                  @keydown.enter.prevent="
                    sub.handle.divideItem({ subId, caret: ($event.target as HTMLInputElement).selectionStart! })
                  "
                  @keydown.backspace="
                    index > 0 &&
                    ($event.target as HTMLInputElement).selectionStart === 0 &&
                    ($event.target as HTMLInputElement).selectionEnd === 0 &&
                    ($event.preventDefault(), sub.handle.connectItem({ subId }))
                  "
                />
                <IconDrag
                  data-testid="SubDrag"
                  class="flex-initial"
                  @touchstart="sub.handle.dragInit({ subId, y: $event.changedTouches[0]?.clientY })"
                  @mousedown="sub.handle.dragInit({ subId, y: $event.clientY })"
                />
                <transition>
                  <IconTrash
                    data-testid="SubTrash"
                    class="theme-color-back trans-option-text absolute right-3 [transform:translateX(150%)]"
                    @click="sub.handle.deleteItem({ subId })"
                  />
                </transition>
              </li>
            </transition-group>
          </ul>
        </transition>
      </main>
      <footer
        data-testid="SubFoot"
        class="theme-color-grad theme-shadow-outer flex flex-initial items-center gap-3 p-3"
        :class="sub.render.classLimit()"
      >
        <InputTextbox
          data-testid="SubDate"
          class="w-full flex-1"
          :placeholder="i18next.t(`placeholder.date`)"
          :model-value="main.state.data[app.render.listId()]!.data[app.render.mainId()]!.date"
          readonly
          @click="sub.handle.openDate()"
        />
        <InputTextbox
          data-testid="SubTime"
          class="w-full flex-1"
          :placeholder="i18next.t(`placeholder.time`)"
          :model-value="main.state.data[app.render.listId()]!.data[app.render.mainId()]!.time"
          readonly
          @click="sub.handle.openTime()"
        />
        <InputTextbox
          data-testid="SubDialog"
          class="w-full flex-1"
          :placeholder="i18next.t(`placeholder.alarm`)"
          :model-value="sub.render.textAlarm()"
          readonly
          @click="sub.handle.openAlarm()"
        />
      </footer>
    </div>
  </div>
</template>
