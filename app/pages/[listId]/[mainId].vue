<script setup lang="ts">
import app from "@/stores/page/app";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
</script>

<template>
  <PageSub
    :state-main="main.state"
    :state-sub="sub.state"
    :list-id="app.render.listId"
    :main-id="app.render.mainId"
    :class-status="sub.render.classStatus"
    :class-limit="sub.render.classLimit"
    :text-memo="sub.render.textMemo"
    :text-alarm="sub.render.textAlarm"
    @router-back="app.handle.routerBack"
    @toggle-mode="sub.handle.toggleMode"
    @convert-item="sub.handle.convertItem"
    @divide-item="sub.handle.divideItem"
    @connect-item="sub.handle.connectItem"
    @delete-item="sub.handle.deleteItem"
    @open-calendar="sub.handle.openCalendar"
    @open-clock="sub.handle.openClock"
    @open-alarm="sub.handle.openAlarm"
    @drag-init="sub.handle.dragInit"
    @drag-start="sub.handle.dragStart"
    @drag-move="sub.handle.dragMove"
    @drag-end="sub.handle.dragEnd"
    @swipe-init="sub.handle.swipeInit"
    @swipe-start="sub.handle.swipeStart"
    @swipe-move="sub.handle.swipeMove"
    @swipe-end="sub.handle.swipeEnd"
  />
</template>
