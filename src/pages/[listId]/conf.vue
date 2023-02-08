<script setup lang='ts'>
import constant from '@/utils/const';
import * as app from '@/composables/page/app';
import * as conf from '@/composables/page/conf';
</script>

<template>
<PartLayout class="pageConf select-none"
  @touchstart.self="conf.action.swipeInit({event: $event})"
  @touchmove="conf.action.swipeStart({event: $event}), conf.action.swipeMove({event: $event})"
  @touchend="conf.action.swipeEnd({event: $event})">
  <PartLayout class="home flex column">
    <PartLayout class="head auto flex align-center padding-l gap-l">
      <IconDown class="auto" @click="app.action.routerBack()" />
      <PartText class="even font-l">{{app.getter.lang().conf.title}}</PartText>
      <PartText class="auto">{{constant.base.title}} {{constant.base.version}}</PartText>
    </PartLayout>
    <PartLayout tag="ul" class="body even padding-l scrollXY">
      <PartLayout class="item flex align-center padding-l gap-l border-bottom-m">
        <PartText class="even">{{app.getter.lang().conf.size.title}}</PartText>
        <InputRange class="even" min="1" max="3" step="1" v-model="conf.state.data.size" />
        <PartText class="auto">{{app.getter.lang().conf.size.value[conf.state.data.size]}}</PartText>
      </PartLayout>
      <PartLayout class="item flex align-center padding-l gap-l border-bottom-m">
        <PartText class="even">{{app.getter.lang().conf.speed.title}}</PartText>
        <InputRange class="even" min="1" max="3" step="1" v-model="conf.state.data.speed" />
        <PartText class="auto">{{app.getter.lang().conf.speed.value[conf.state.data.speed]}}</PartText>
      </PartLayout>
      <PartLayout class="item flex align-center padding-l gap-l border-bottom-m">
        <PartText class="even">{{app.getter.lang().conf.volume.title}}</PartText>
        <InputRange class="even" min="0" max="3" step="1" v-model="conf.state.data.volume" />
        <PartText class="auto">{{app.getter.lang().conf.volume.value[conf.state.data.volume]}}</PartText>
      </PartLayout>
      <PartLayout class="item flex align-center padding-l gap-l border-bottom-m">
        <PartText class="even">{{app.getter.lang().conf.vibrate.title}}</PartText>
        <InputRadio class="auto" value="off"
          v-model="conf.state.data.vibrate">{{app.getter.lang().conf.vibrate.value.off}}</InputRadio>
        <InputRadio class="auto" value="on"
          v-model="conf.state.data.vibrate">{{app.getter.lang().conf.vibrate.value.on}}</InputRadio>
      </PartLayout>
      <PartLayout class="item flex align-center padding-l gap-l border-bottom-m">
        <PartText class="even">{{app.getter.lang().conf.theme.title}}</PartText>
        <InputRadio class="auto" value="light"
          v-model="conf.state.data.theme">{{app.getter.lang().conf.theme.value.light}}</InputRadio>
        <InputRadio class="auto" value="dark"
          v-model="conf.state.data.theme">{{app.getter.lang().conf.theme.value.dark}}</InputRadio>
      </PartLayout>
      <PartLayout class="item flex align-center padding-l gap-l border-bottom-m">
        <PartText class="even">{{app.getter.lang().conf.lang.title}}</PartText>
        <InputRadio class="auto" value="en"
          v-model="conf.state.data.lang">{{app.getter.lang().conf.lang.value.en}}</InputRadio>
        <InputRadio class="auto" value="jp"
          v-model="conf.state.data.lang">{{app.getter.lang().conf.lang.value.jp}}</InputRadio>
      </PartLayout>
      <PartLayout class="item flex align-center padding-l gap-2l border-bottom-m">
        <PartText class="even">{{app.getter.lang().conf.backup.title}}</PartText>
        <PartBase tag="a" class="auto" @click="conf.action.downloadBackup({event: $event})">
          <InputButton>{{app.getter.lang().conf.backup.download}}</InputButton>
        </PartBase>
        <InputFile class="auto error" @change="conf.action.uploadBackup({event: $event})">
          {{app.getter.lang().conf.backup.upload}}</InputFile>
      </PartLayout>
      <PartLayout class="item flex align-center padding-l gap-2l border-bottom-m">
        <PartText class="even">{{app.getter.lang().conf.reset.title}}</PartText>
        <InputButton class="auto" @click="conf.action.resetConf()">{{app.getter.lang().conf.reset.conf}}</InputButton>
        <InputButton class="auto error" @click="conf.action.resetList()">{{app.getter.lang().conf.reset.list}}</InputButton>
      </PartLayout>
    </PartLayout>
  </PartLayout>
</PartLayout>
</template>

<style lang='scss' scoped>
.pageConf {
  position: absolute;
  z-index: zindex(page);
  right: 0;
  bottom: 0;
  left: 0;
  height: 200%;
  &.v-enter-active, &.v-leave-active {
    .speed1 & {
      transition: transform 1s, background 1s;
    }
    .speed2 & {
      transition: transform 0.5s, background 0.5s;
    }
    .speed3 & {
      transition: transform 0.25s, background 0.25s;
    }
  }
  &.v-enter-from, &.v-leave-to {
    transform: translateY(50%) !important;
    background: transparent !important;
  }
  .light & {
    background: $color-mask-light;
  }
  .dark & {
    background: $color-mask-dark;
  }
  > .home {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 0;
    left: 0;
    height: 45%;
    .light & {
      background: $color-grad-light;
      box-shadow: $shadow-normal-light;
    }
    .dark & {
      background: $color-grad-dark;
      box-shadow: $shadow-normal-dark;
    }
    > .head {
      position: relative;
      z-index: 9;
      .light & {
        box-shadow: $shadow-normal-light;
      }
      .dark & {
        box-shadow: $shadow-normal-dark;
      }
    }
    > .body {
      > .item {
        height: 4rem;
        .light & {
          background: $color-back-light;
        }
        .dark & {
          background: $color-back-dark;
        }
      }
    }
  }
}
</style>
