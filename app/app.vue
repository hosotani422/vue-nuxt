<script setup lang="ts">
import app from "@/stores/page/app";
import calendar from "@/stores/popup/calendar";
import clock from "@/stores/popup/clock";
import dialog from "@/stores/popup/dialog";
import notice from "@/stores/popup/notice";
await app.handle.init();
</script>

<template>
  <Html
    data-testid="AppRoot"
    class="theme-color-font"
    :class="[app.render.classTheme(), app.render.classSize(), app.render.classSpeed()]"
  >
    <Head>
      <Title data-testid="AppTitle">Memosuku</Title>
      <Meta data-testid="AppCharset" charset="utf-8" />
      <Meta data-testid="AppViewport" name="viewport" content="width=device-width, initial-scale=1" />
      <Meta data-testid="AppDescription" name="description" content="メモ帳、TODOアプリ" />
      <Link data-testid="AppIcon" rel="icon" href="/favicon.png" />
      <NoScript data-testid="AppNoScript">JavaScript is required</NoScript>
    </Head>
    <Body class="fixed inset-0 z-[1]">
      <NuxtPage page-key="pageKey" />
      <PopupCalendar
        :refer="calendar.refer"
        :state="calendar.state"
        :class-status="calendar.render.classStatus"
        :get-week="calendar.handle.getWeek"
        :get-day="calendar.handle.getDay"
        @close="calendar.handle.close"
        @page-move="calendar.handle.pageMove"
        @swipe-init="calendar.handle.swipeInit"
        @swipe-start="calendar.handle.swipeStart"
        @swipe-move="calendar.handle.swipeMove"
        @swipe-end="calendar.handle.swipeEnd"
      />
      <PopupClock
        :refer="clock.refer"
        :state="clock.state"
        @close="clock.handle.close"
        @input-time="clock.handle.inputTime"
      />
      <PopupDialog
        :refer="dialog.refer"
        :state="dialog.state"
        :state-check-all="dialog.render.stateCheckAll"
        :error-validation="dialog.render.errorValidation"
        @click-check-all="dialog.handle.clickCheckAll"
      />
      <PopupNotice :refer="notice.refer" :state="notice.state" />
    </Body>
  </Html>
</template>
