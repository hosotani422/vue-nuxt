<script setup lang="ts">
import app from "@/stores/page/app";
import list from "@/stores/page/list";
</script>

<template>
  <PageList
    :constant="app.refer.constant"
    :state-list="list.state"
    :select-id="app.render.listId"
    :class-status="list.render.classStatus"
    :class-limit="list.render.classLimit"
    :type-icon="list.render.typeIcon"
    :text-count="list.render.textCount"
    @router-back="app.handle.routerBack"
    @edit-item="list.handle.editItem"
    @entry-item="list.handle.entryItem"
    @copy-item="list.handle.copyItem"
    @delete-item="list.handle.deleteItem"
    @drag-init="list.handle.dragInit"
    @drag-start="list.handle.dragStart"
    @drag-move="list.handle.dragMove"
    @drag-end="list.handle.dragEnd"
    @swipe-init="list.handle.swipeInit"
    @swipe-start="list.handle.swipeStart"
    @swipe-move="list.handle.swipeMove"
    @swipe-end="list.handle.swipeEnd"
  />
</template>
