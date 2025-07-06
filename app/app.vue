<script setup lang="ts">
import app from "@/store/page/app";
import date from "@/store/popup/date";
import time from "@/store/popup/time";
import dialog from "@/store/popup/dialog";
import notice from "@/store/popup/notice";
await app.handle.init();
</script>

<template>
  <Html
    class="theme-color-font"
    :class="{ ...app.render.classTheme(), ...app.render.classSize(), ...app.render.classSpeed() }"
  >
    <Head>
      <Title>Memosuku</Title>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="description" content="メモ帳、TODOアプリ" />
      <Link rel="icon" href="/favicon.png" />
      <NoScript>JavaScript is required</NoScript>
    </Head>
    <Body class="fixed inset-0 z-[1]">
      <NuxtPage page-key="pageKey" />
      <PopupDate :date="date" />
      <PopupTime :time="time" />
      <PopupDialog :dialog="dialog" />
      <PopupNotice :notice="notice" />
    </Body>
  </Html>
</template>
