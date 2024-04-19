<script setup lang="ts">
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
</script>

<template>
  <PageList
    :constant="constant"
    :state-list="list.state"
    :select-id="app.getter.listId"
    :class-status="list.getter.classStatus"
    :class-limit="list.getter.classLimit"
    :type-icon="list.getter.typeIcon"
    :text-count="list.getter.textCount"
    @router-back="app.action.routerBack"
    @edit-item="list.action.editItem"
    @entry-item="list.action.entryItem"
    @copy-item="list.action.copyItem"
    @delete-item="list.action.deleteItem"
    @drag-init="list.action.dragInit"
    @drag-start="list.action.dragStart"
    @drag-move="list.action.dragMove"
    @drag-end="list.action.dragEnd"
    @swipe-init="list.action.swipeInit"
    @swipe-start="list.action.swipeStart"
    @swipe-move="list.action.swipeMove"
    @swipe-end="list.action.swipeEnd"
  />
</template>
