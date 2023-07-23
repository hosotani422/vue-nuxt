<script setup lang='ts'>
import constant from '@/utils/const';
import app from '@/stores/page/app';
import list from '@/stores/page/list';
</script>

<template>
<PageList
  :refer="list.refer"
  :status="list.state.status"
  :title="constant.base.title"
  :trashId="constant.base.id.trash"
  :getListId="app.getter.listId"
  :stateFull="list.getter.stateFull"
  :stateUnit="list.getter.stateUnit"
  :classItem="list.getter.classItem"
  :iconType="list.getter.iconType"
  :classLimit="list.getter.classLimit"
  :textCount="list.getter.textCount"
  @routerBack="app.action.routerBack"
  @insertItem="list.action.insertItem"
  @copyItem="list.action.copyItem"
  @deleteItem="list.action.deleteItem"
  @switchEdit="list.action.switchEdit"
  @dragInit="list.action.dragInit"
  @dragStart="list.action.dragStart"
  @dragMove="list.action.dragMove"
  @dragEnd="list.action.dragEnd"
  @swipeInit="list.action.swipeInit"
  @swipeStart="list.action.swipeStart"
  @swipeMove="list.action.swipeMove"
  @swipeEnd="list.action.swipeEnd"
/>
</template>
