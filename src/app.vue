<script setup lang='ts'>
import * as Cordova from '@/utils/cordova/cordova';
import app from '@/stores/page/app';
import calendar from '@/stores/popup/calendar';
import clock from '@/stores/popup/clock';
import dialog from '@/stores/popup/dialog';
import notice from '@/stores/popup/notice';
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
          <TempPopupCalendar
            :refer="calendar.refer"
            :state="calendar.state"
            :textWeek="calendar.getter.textWeek"
            :textDay="calendar.getter.textDay"
            :classDay="calendar.getter.classDay"
            @close="calendar.action.close"
            @pageMove="calendar.action.pageMove"
            @swipeInit="calendar.action.swipeInit"
            @swipeStart="calendar.action.swipeStart"
            @swipeMove="calendar.action.swipeMove"
            @swipeEnd="calendar.action.swipeEnd"
          />
          <TempPopupClock
            :refer="clock.refer"
            :state="clock.state"
            @close="clock.action.close"
            @inputHour="clock.action.inputHour"
            @inputMinute="clock.action.inputMinute"
          />
          <TempPopupDialog
            :state="dialog.state"
            :lang="app.getter.lang"
            :stateCheckAll="dialog.getter.stateCheckAll"
            @clickCheckAll="dialog.action.clickCheckAll"
          />
          <TempPopupNotice
            :state="notice.state"
          />
        </div>
        <div v-if="app.getter.isApp()"
          class="theme-back-color" :class="app.getter.classBottom()" />
      </div>
    </Body>
  </Html>
</template>
