<script setup lang="ts">
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
</script>

<template>
  <PageList
    :refer="list.refer"
    :status="list.state.status"
    :title="constant.base.title"
    :trash-id="constant.base.id.trash"
    :get-list-id="app.getter.listId"
    :state-full="list.getter.stateFull"
    :state-unit="list.getter.stateUnit"
    :class-item="list.getter.classItem"
    :icon-type="list.getter.iconType"
    :class-limit="list.getter.classLimit"
    :text-count="list.getter.textCount"
    @router-back="app.action.routerBack"
    @insert-item="list.action.insertItem"
    @copy-item="list.action.copyItem"
    @delete-item="list.action.deleteItem"
    @switch-edit="list.action.switchEdit"
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
