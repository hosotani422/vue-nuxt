<script setup lang='ts'>
import * as Cordova from '@/utils/cordova/cordova';
import app from '@/stores/page/app';
await app.action.initPage();
onBeforeMount(() => {
  Cordova.Admob.mountBanner();
});
onMounted(() => {
  Cordova.Splash.hideMount();
});
</script>

<template>
  <Html class="theme-font-color" :class="app.getter.classTop()">
    <Head>
      <Title>Memotea</Title>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="description" content="メモ帳、TODOアプリ" />
      <Link rel="icon" href="/favicon.png" />
      <NoScript>JavaScript is required</NoScript>
    </Head>
    <Body>
      <div class="fixed z-[1] top-0 right-0 bottom-0 left-0 flex flex-col">
        <div class="flex-even">
          <NuxtPage pageKey="pageKey" />
          <PopupCalendar />
          <PopupClock />
          <PopupDialog />
          <PopupNotice />
        </div>
        <div v-if="app.getter.isApp()"
          class="theme-back-color" :class="app.getter.classBottom()" />
      </div>
    </Body>
  </Html>
</template>
