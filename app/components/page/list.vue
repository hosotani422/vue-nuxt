<script setup lang="ts">
import storeApp from "@/store/page/app";
import storeList from "@/store/page/list";
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  app: typeof storeApp;
  list: typeof storeList;
}>();
</script>

<template>
  <div
    aria-label="list"
    data-id="ListRoot"
    data-testid="ListRoot"
    class="theme-color-mask anime-slide-list absolute inset-y-0 left-0 z-10 w-[200%]"
    @touchmove="
      list.handle.dragStart();
      list.handle.dragMove({ y: $event.changedTouches[0]!.clientY });
      list.handle.swipeStart({ x: $event.changedTouches[0]!.clientX, y: $event.changedTouches[0]!.clientY });
      list.handle.swipeMove({ x: $event.changedTouches[0]!.clientX });
    "
    @mousemove="
      list.handle.dragStart();
      list.handle.dragMove({ y: $event.clientY });
      list.handle.swipeStart({ x: $event.clientX, y: $event.clientY });
      list.handle.swipeMove({ x: $event.clientX });
    "
    @touchend="
      list.handle.dragEnd();
      list.handle.swipeEnd({ x: $event.changedTouches[0]!.clientX });
    "
    @mouseup="
      list.handle.dragEnd();
      list.handle.swipeEnd({ x: $event.clientX });
    "
    @click="list.handle.editItem()"
  >
    <aside
      data-testid="ListBack"
      class="absolute inset-y-0 right-0 z-[1] w-[57%]"
      @touchstart="
        list.handle.swipeInit({ x: $event.changedTouches[0]!.clientX, y: $event.changedTouches[0]!.clientY })
      "
      @mousedown="list.handle.swipeInit({ x: $event.clientX, y: $event.clientY })"
    />
    <div
      data-testid="ListHome"
      class="theme-color-grad theme-shadow-outer absolute inset-y-0 left-0 z-[1] flex w-[43%] flex-col"
    >
      <header
        data-testid="ListHead"
        class="theme-color-grad theme-shadow-outer relative z-[9] flex flex-initial items-center gap-3 p-3"
      >
        <IconPlus data-testid="ListPlus" class="flex-initial" @click="list.handle.entryItem()" />
        <h1 data-testid="ListTitle" class="line-clamp-1 flex-1 text-xl">{{ app.refer.constant.app.name }}</h1>
        <IconArrow data-testid="ListLeft" class="flex-initial rotate-180" @click="app.handle.routerBack()" />
      </header>
      <main class="flex-1 select-none overflow-auto p-3">
        <ul data-id="ListBody" data-testid="ListBody">
          <transition-group>
            <li
              v-for="listId of list.state.data.sort"
              :key="listId"
              :data-id="`ListItem${listId}`"
              data-testid="ListItem"
              class="theme-color-border theme-color-back trans-select-label trans-edit-item anime-scale-item group relative flex h-16 items-center gap-3 overflow-hidden border-b-[0.1rem] border-solid p-3"
              :class="{ ...list.render.classStatus({ listId }), ...list.render.classLimit({ listId }) }"
              @contextmenu.prevent
              @longtouch="
                list.handle.editItem({ listId });
                list.handle.dragInit({ listId, y: $event.detail.changedTouches[0]!.clientY });
              "
              @longclick="
                list.handle.editItem({ listId });
                list.handle.dragInit({ listId, y: $event.detail.clientY });
              "
              @click="list.state.status[listId] !== `edit` && app.handle.routerBack({ listId })"
            >
              <component :is="list.render.typeIcon({ listId })" data-testid="ListIcon" class="flex-initial" />
              <h2 data-testid="ListTask" class="line-clamp-1 flex-1">
                {{ list.state.data.data[listId]!.title }}
              </h2>
              <p data-testid="ListCount" class="flex-initial">
                {{ list.render.textCount({ listId }) }}
              </p>
              <div class="theme-color-back trans-option-label absolute right-3 flex [transform:translateX(150%)] gap-3">
                <IconClone
                  v-if="listId !== app.refer.constant.id.trash"
                  data-testid="ListClone"
                  class="flex-initial"
                  @click.stop="list.handle.copyItem({ listId })"
                />
                <IconTrash
                  v-if="listId !== app.render.listId() && listId !== app.refer.constant.id.trash"
                  data-testid="ListTrash"
                  class="flex-initial"
                  @click.stop="list.handle.deleteItem({ listId })"
                />
              </div>
            </li>
          </transition-group>
        </ul>
      </main>
    </div>
  </div>
</template>
