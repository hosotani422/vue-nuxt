<script setup lang="ts">
import i18next from "i18next";
import storeApp from "@/store/page/app";
import storeList from "@/store/page/list";
import storeMain from "@/store/page/main";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  app: typeof storeApp;
  list: typeof storeList;
  main: typeof storeMain;
}>();
</script>

<template>
  <div
    v-if="list.state.data.data[app.render.listId()]"
    aria-label="main"
    data-testid="MainRoot"
    class="theme-color-grad absolute inset-0 z-[1] flex flex-col"
    @touchmove="
      main.handle.dragStart();
      main.handle.dragMove({ y: $event.changedTouches[0]!.clientY });
    "
    @mousemove="
      main.handle.dragStart();
      main.handle.dragMove({ y: $event.clientY });
    "
    @touchend="main.handle.dragEnd()"
    @mouseup="main.handle.dragEnd()"
    @click="main.handle.editItem()"
  >
    <header
      data-testid="MainHead"
      class="theme-color-grad theme-shadow-outer relative z-[9] flex flex-initial items-center gap-3 p-3"
    >
      <IconList data-testid="MainList" class="flex-initial" @click="app.handle.routerList()" />
      <client-only>
        <InputTextbox
          v-model="list.state.data.data[app.render.listId()]!.title"
          data-testid="MainTitle"
          class="flex-1 text-xl"
          :placeholder="i18next.t(`placeholder.list`)"
        />
      </client-only>
      <IconConf data-testid="MainConf" class="flex-initial" @click="app.handle.routerConf()" />
      <IconPlus data-testid="MainPlus" class="flex-initial" @click="main.handle.entryItem()" />
    </header>
    <main class="flex-1 select-none overflow-auto p-3">
      <ul data-id="MainBody" data-testid="MainBody">
        <client-only>
          <transition-group appear>
            <li
              v-for="mainId of main.state.data[app.render.listId()]!.sort"
              :key="mainId"
              :data-id="`MainItem${mainId}`"
              data-testid="MainItem"
              class="theme-color-border theme-color-back trans-select-label trans-edit-item trans-check-item anime-scale-item group relative flex h-16 items-center gap-3 overflow-hidden border-b-[0.1rem] border-solid p-3"
              :class="{ ...main.render.classStatus({ mainId }), ...main.render.classLimit({ mainId }) }"
              @contextmenu.prevent
              @longtouch="
                main.handle.editItem({ mainId });
                main.handle.dragInit({ mainId, y: $event.detail.changedTouches[0]!.clientY });
              "
              @longclick="
                main.handle.editItem({ mainId });
                main.handle.dragInit({ mainId, y: $event.detail.clientY });
              "
              @click="main.state.status[mainId] !== `edit` && app.handle.routerSub({ mainId })"
            >
              <InputCheck
                v-model="main.state.data[app.render.listId()]!.data[mainId]!.check"
                data-testid="MainCheck"
                class="flex-initial"
                @click.stop
              />
              <h3 data-testid="MainTask" class="line-clamp-1 flex-1">
                {{ main.state.data[app.render.listId()]!.data[mainId]!.title }}
              </h3>
              <p data-testid="MainCount" class="flex-initial">
                {{ main.render.textCount({ mainId }) }}
              </p>
              <div class="theme-color-back trans-option-label absolute right-3 flex [transform:translateX(150%)] gap-3">
                <IconClone
                  data-testid="MainClone"
                  class="flex-initial"
                  @click.stop="main.handle.copyItem({ mainId })"
                />
                <IconMove data-testid="MainMove" class="flex-initial" @click.stop="main.handle.moveItem({ mainId })" />
                <IconTrash
                  data-testid="MainTrash"
                  class="flex-initial"
                  @click.stop="main.handle.deleteItem({ mainId })"
                />
              </div>
            </li>
          </transition-group>
        </client-only>
      </ul>
    </main>
    <transition>
      <NuxtPage page-key="contentsKey" />
    </transition>
  </div>
</template>
