<script setup lang='ts'>
import * as Cordova from '@/utils/cordova/cordova';
import * as app from '@/composables/page/app';
await app.action.initPage();
onBeforeMount(() => {
  Cordova.Admob.mountBanner();
});
onMounted(() => {
  Cordova.Splash.hideMount();
});
</script>

<template>
  <Html :style="app.getter.styleHtml()">
    <Head>
      <Title>Memotea</Title>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="description" content="メモ帳、TODOアプリ" />
      <Link rel="icon" href="/favicon.png" />
      <NoScript>JavaScript is required</NoScript>
    </Head>
    <Body>
      <PartLayout class="pageRoot flex column" :class="app.getter.classTop()">
        <PartLayout class="even">
          <NuxtPage pageKey="pageKey" />
          <PopupCalendar />
          <PopupClock />
          <PopupDialog />
          <PopupNotice />
        </PartLayout>
        <PartLayout class="foot" :class="app.getter.classFoot()" v-if="app.getter.isApp()" />
      </PartLayout>
    </Body>
  </Html>
</template>

<style lang='scss' scoped>
.pageRoot {
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  > .foot {
    background: $color-back-dark;
    &.small {
      flex: 0 0 32px;
    }
    &.middle {
      flex: 0 0 50px;
    }
    &.large {
      flex: 0 0 90px;
    }
  }
}
</style>
