<script setup lang='ts'>
import app from '@/stores/page/app';
import list from '@/stores/page/list';
import main from '@/stores/page/main';
</script>

<template>
<TempPageMain
  :refer="main.refer"
  :status="main.state.status"
  :lang="app.getter.lang"
  :listId="app.getter.listId"
  :listUnit="list.getter.stateUnit"
  :stateFull="main.getter.stateFull"
  :stateUnit="main.getter.stateUnit"
  :classItem="main.getter.classItem"
  :classLimit="main.getter.classLimit"
  :textCount="main.getter.textCount"
  @routerList="app.action.routerList"
  @routerSub="app.action.routerSub"
  @routerConf="app.action.routerConf"
  @insertItem="main.action.insertItem"
  @copyItem="main.action.copyItem"
  @moveItem="main.action.moveItem"
  @deleteItem="main.action.deleteItem"
  @checkItem="main.action.checkItem"
  @switchEdit="main.action.switchEdit"
  @dragInit="main.action.dragInit"
  @dragStart="main.action.dragStart"
  @dragMove="main.action.dragMove"
  @dragEnd="main.action.dragEnd"
/>
</template>
