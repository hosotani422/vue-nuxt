<script setup lang="ts">
import app from "@/store/page/app";
import list from "@/store/page/list";
</script>

<template>
  <PageList :app="app" :list="list" />
</template>
