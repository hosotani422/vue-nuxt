<script setup lang="ts">
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
</script>

<template>
  <PageMain
    :state-list="list.state"
    :state-main="main.state"
    :list-id="app.getter.listId"
    :class-status="main.getter.classStatus"
    :class-limit="main.getter.classLimit"
    :text-count="main.getter.textCount"
    @router-list="app.action.routerList"
    @router-sub="app.action.routerSub"
    @router-conf="app.action.routerConf"
    @edit-item="main.action.editItem"
    @entry-item="main.action.entryItem"
    @copy-item="main.action.copyItem"
    @move-item="main.action.moveItem"
    @delete-item="main.action.deleteItem"
    @drag-init="main.action.dragInit"
    @drag-start="main.action.dragStart"
    @drag-move="main.action.dragMove"
    @drag-end="main.action.dragEnd"
  />
</template>
