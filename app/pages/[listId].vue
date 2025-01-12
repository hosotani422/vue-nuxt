<script setup lang="ts">
import app from "@/store/page/app";
import list from "@/store/page/list";
import main from "@/store/page/main";
</script>

<template>
  <PageMain :app="app" :list="list" :main="main" />
</template>
