<script setup lang="ts">
import i18next from "i18next";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  stateList: typeof list.state;
  stateMain: typeof main.state;
  listId: typeof app.render.listId;
  classStatus: typeof main.render.classStatus;
  classLimit: typeof main.render.classLimit;
  textCount: typeof main.render.textCount;
}>();
const emit = defineEmits<{
  routerList: [];
  routerSub: [arg: { mainId: string }];
  routerConf: [];
  editItem: [arg?: { mainId: string }];
  entryItem: [];
  copyItem: [arg: { mainId: string }];
  moveItem: [arg: { mainId: string }];
  deleteItem: [arg: { mainId: string }];
  dragInit: [arg: { mainId: string; y: number }];
  dragStart: [];
  dragMove: [arg: { y: number }];
  dragEnd: [];
}>();
</script>

<template>
  <div
    v-if="stateList.data.data[listId()]"
    data-testid="MainRoot"
    class="theme-color-grad absolute inset-0 z-[1] flex flex-col"
    @touchmove="
      emit(`dragStart`);
      emit(`dragMove`, { y: $event.changedTouches[0]!.clientY });
    "
    @mousemove="
      emit(`dragStart`);
      emit(`dragMove`, { y: $event.clientY });
    "
    @touchend="emit(`dragEnd`)"
    @mouseup="emit(`dragEnd`)"
    @click="emit(`editItem`)"
  >
    <div
      data-testid="MainHead"
      class="theme-color-grad theme-shadow-outer relative z-[9] flex flex-initial items-center gap-3 p-3"
    >
      <IconList data-testid="MainList" class="flex-initial" @click="emit(`routerList`)" />
      <client-only>
        <InputTextbox
          v-model="stateList.data.data[listId()]!.title"
          data-testid="MainTitle"
          class="flex-1 text-xl"
          :placeholder="i18next.t(`placeholder.list`)"
        />
      </client-only>
      <IconConf data-testid="MainConf" class="flex-initial" @click="emit(`routerConf`)" />
      <IconPlus data-testid="MainPlus" class="flex-initial" @click="emit(`entryItem`)" />
    </div>
    <ul data-id="MainBody" data-testid="MainBody" class="flex-1 select-none overflow-auto p-3">
      <client-only>
        <transition-group appear>
          <li
            v-for="mainId of stateMain.data[listId()]!.sort"
            :key="mainId"
            :data-id="`MainItem${mainId}`"
            data-testid="MainItem"
            class="theme-color-border theme-color-back trans-select-label trans-edit-item trans-check-item anime-scale-item group relative flex h-16 items-center gap-3 overflow-hidden border-b-[0.1rem] border-solid p-3"
            :class="`${classStatus({ mainId })} ${classLimit({ mainId })}`"
            @contextmenu.prevent
            @longtouch="
              emit(`editItem`, { mainId });
              emit(`dragInit`, { mainId, y: $event.detail.changedTouches[0]!.clientY });
            "
            @longclick="
              emit(`editItem`, { mainId });
              emit(`dragInit`, { mainId, y: $event.detail.clientY });
            "
            @click="stateMain.status[mainId] !== `edit` && emit(`routerSub`, { mainId })"
          >
            <InputCheck
              v-model="stateMain.data[listId()]!.data[mainId]!.check"
              data-testid="MainCheck"
              class="flex-initial"
              @click.stop
            />
            <div data-testid="MainTask" class="line-clamp-1 flex-1">
              {{ stateMain.data[listId()]!.data[mainId]!.title }}
            </div>
            <div data-testid="MainCount" class="flex-initial">
              {{ textCount({ mainId }) }}
            </div>
            <div class="theme-color-back trans-option-label absolute right-3 flex translate-x-[150%] gap-3">
              <IconClone data-testid="MainClone" class="flex-initial" @click.stop="emit(`copyItem`, { mainId })" />
              <IconMove data-testid="MainMove" class="flex-initial" @click.stop="emit(`moveItem`, { mainId })" />
              <IconTrash data-testid="MainTrash" class="flex-initial" @click.stop="emit(`deleteItem`, { mainId })" />
            </div>
          </li>
        </transition-group>
      </client-only>
    </ul>
    <transition>
      <NuxtPage page-key="contentsKey" />
    </transition>
  </div>
</template>
