<script setup lang='ts'>
import app from '@/stores/page/app';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';
</script>

<template>
<TempPageSub
  :refer="sub.refer"
  :lang="app.getter.lang"
  :listId="app.getter.listId"
  :mainId="app.getter.mainId"
  :mainUnit="main.getter.stateUnit"
  :stateFull="sub.getter.stateFull"
  :stateUnit="sub.getter.stateUnit"
  :classItem="sub.getter.classItem"
  :textMemo="sub.getter.textMemo"
  :classLimit="sub.getter.classLimit"
  :textAlarm="sub.getter.textAlarm"
  @routerBack="app.action.routerBack"
  @inputItem="sub.action.inputItem"
  @enterItem="sub.action.enterItem"
  @backItem="sub.action.backItem"
  @deleteItem="sub.action.deleteItem"
  @checkItem="sub.action.checkItem"
  @switchItem="sub.action.switchItem"
  @switchEdit="sub.action.switchEdit"
  @inputMemo="sub.action.inputMemo"
  @openCalendar="sub.action.openCalendar"
  @openClock="sub.action.openClock"
  @openAlarm="sub.action.openAlarm"
  @dragInit="sub.action.dragInit"
  @dragStart="sub.action.dragStart"
  @dragMove="sub.action.dragMove"
  @dragEnd="sub.action.dragEnd"
  @swipeInit="sub.action.swipeInit"
  @swipeStart="sub.action.swipeStart"
  @swipeMove="sub.action.swipeMove"
  @swipeEnd="sub.action.swipeEnd"
/>
</template>
