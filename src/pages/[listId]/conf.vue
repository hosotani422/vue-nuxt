<script setup lang='ts'>
import constant from '@/utils/const';
import app from '@/stores/page/app';
import conf from '@/stores/page/conf';
</script>

<template>
<PageConf
  :title="`${constant.base.title} ${constant.base.version}`"
  :state="conf.state.data"
  :lang="app.getter.lang"
  @routerBack="app.action.routerBack"
  @downloadBackup="conf.action.downloadBackup"
  @uploadBackup="conf.action.uploadBackup"
  @resetConf="conf.action.resetConf"
  @resetList="conf.action.resetList"
  @swipeInit="conf.action.swipeInit"
  @swipeStart="conf.action.swipeStart"
  @swipeMove="conf.action.swipeMove"
  @swipeEnd="conf.action.swipeEnd"
/>
</template>
