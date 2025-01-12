<script setup lang="ts">
import app from "@/store/page/app";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
</script>

<template>
  <PageSub :app="app" :main="main" :sub="sub" />
</template>
