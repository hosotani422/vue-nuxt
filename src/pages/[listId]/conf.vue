<script setup lang='ts'>
import constant from '@/utils/const';
import app from '@/stores/page/app';
import conf from '@/stores/page/conf';
</script>

<template>
<div class="absolute z-[10] right-0 bottom-0 left-0 h-[200%] select-none theme-mask-color
  speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
  active:transition fromto:!translate-y-[50%] fromto:!bg-transparent"
  @touchstart.self="conf.action.swipeInit({event: $event})"
  @touchmove="conf.action.swipeStart({event: $event}), conf.action.swipeMove({event: $event})"
  @touchend="conf.action.swipeEnd({event: $event})">
  <div class="absolute z-[1] right-0 bottom-0 left-0 h-[45%] flex flex-col theme-grad-color theme-shadow-normal">
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
      <IconDown class="flex-auto" @click="app.action.routerBack()" />
      <p class="flex-even text-xl">{{app.getter.lang().conf.title}}</p>
      <p class="flex-auto">{{constant.base.title}} {{constant.base.version}}</p>
    </div>
    <ul class="body flex-even p-3 overflow-auto">
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.size.title}}</p>
        <InputRange class="flex-even" min="1" max="3" step="1" v-model="conf.state.data.size" />
        <p class="flex-auto">{{app.getter.lang().conf.size.value[conf.state.data.size]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.speed.title}}</p>
        <InputRange class="flex-even" min="1" max="3" step="1" v-model="conf.state.data.speed" />
        <p class="flex-auto">{{app.getter.lang().conf.speed.value[conf.state.data.speed]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.volume.title}}</p>
        <InputRange class="flex-even" min="0" max="3" step="1" v-model="conf.state.data.volume" />
        <p class="flex-auto">{{app.getter.lang().conf.volume.value[conf.state.data.volume]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.vibrate.title}}</p>
        <InputRadio class="flex-auto" value="off"
          v-model="conf.state.data.vibrate">{{app.getter.lang().conf.vibrate.value.off}}</InputRadio>
        <InputRadio class="flex-auto" value="on"
          v-model="conf.state.data.vibrate">{{app.getter.lang().conf.vibrate.value.on}}</InputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.theme.title}}</p>
        <InputRadio class="flex-auto" value="light"
          v-model="conf.state.data.theme">{{app.getter.lang().conf.theme.value.light}}</InputRadio>
        <InputRadio class="flex-auto" value="dark"
          v-model="conf.state.data.theme">{{app.getter.lang().conf.theme.value.dark}}</InputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.lang.title}}</p>
        <InputRadio class="flex-auto" value="en"
          v-model="conf.state.data.lang">{{app.getter.lang().conf.lang.value.en}}</InputRadio>
        <InputRadio class="flex-auto" value="jp"
          v-model="conf.state.data.lang">{{app.getter.lang().conf.lang.value.jp}}</InputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.save.title}}</p>
        <InputRadio class="flex-auto" value="local"
          v-model="conf.state.data.save">{{app.getter.lang().conf.save.value.local}}</InputRadio>
        <InputRadio class="flex-auto" value="rest"
          v-model="conf.state.data.save">{{app.getter.lang().conf.save.value.rest}}</InputRadio>
        <InputRadio class="flex-auto" value="gql"
          v-model="conf.state.data.save">{{app.getter.lang().conf.save.value.gql}}</InputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.backup.title}}</p>
        <a class="flex-auto" @click="conf.action.downloadBackup({event: $event})">
          <InputButton class="flex-auto text-theme-fine">{{app.getter.lang().conf.backup.download}}</InputButton>
        </a>
        <InputFile class="flex-auto text-theme-warn" @change="conf.action.uploadBackup({event: $event})">
          {{app.getter.lang().conf.backup.upload}}</InputFile>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{app.getter.lang().conf.reset.title}}</p>
        <InputButton class="flex-auto text-theme-fine" @click="conf.action.resetConf()">
          {{app.getter.lang().conf.reset.conf}}</InputButton>
        <InputButton class="flex-auto text-theme-warn" @click="conf.action.resetList()">
          {{app.getter.lang().conf.reset.list}}</InputButton>
      </li>
    </ul>
  </div>
</div>
</template>
