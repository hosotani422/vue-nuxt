<script setup lang="ts">
import app from "@/stores/page/app";
import conf from "@/stores/page/conf";
</script>

<template>
  <PageConf
    :update-key="app.state.updateKey"
    :constant="app.refer.constant"
    :state="conf.state"
    @router-back="app.handle.routerBack"
    @download-backup="conf.handle.downloadBackup"
    @upload-backup="conf.handle.uploadBackup"
    @reset-conf="conf.handle.resetConf"
    @reset-list="conf.handle.resetList"
    @swipe-init="conf.handle.swipeInit"
    @swipe-start="conf.handle.swipeStart"
    @swipe-move="conf.handle.swipeMove"
    @swipe-end="conf.handle.swipeEnd"
  />
</template>
