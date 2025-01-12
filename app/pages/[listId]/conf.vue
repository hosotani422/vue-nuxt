<script setup lang="ts">
import app from "@/store/page/app";
import conf from "@/store/page/conf";
</script>

<template>
  <PageConf :app="app" :conf="conf" />
</template>
