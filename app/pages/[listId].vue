<script setup lang="ts">
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
</script>

<template>
  <PageMain
    :state-list="list.state"
    :state-main="main.state"
    :list-id="app.render.listId"
    :class-status="main.render.classStatus"
    :class-limit="main.render.classLimit"
    :text-count="main.render.textCount"
    @router-list="app.handle.routerList"
    @router-sub="app.handle.routerSub"
    @router-conf="app.handle.routerConf"
    @edit-item="main.handle.editItem"
    @entry-item="main.handle.entryItem"
    @copy-item="main.handle.copyItem"
    @move-item="main.handle.moveItem"
    @delete-item="main.handle.deleteItem"
    @drag-init="main.handle.dragInit"
    @drag-start="main.handle.dragStart"
    @drag-move="main.handle.dragMove"
    @drag-end="main.handle.dragEnd"
  />
</template>
