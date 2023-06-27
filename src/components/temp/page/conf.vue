<script setup lang='ts'>
import conf from '@/stores/page/conf';
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  title: string;
  state: typeof conf[`state`][`data`];
  lang: Function;
}>();
defineEmits([
  `routerBack`, `downloadBackup`, `uploadBackup`, `resetConf`, `resetList`,
  `swipeInit`, `swipeStart`, `swipeMove`, `swipeEnd`,
]);
</script>

<template>
<div class="absolute z-[10] right-0 bottom-0 left-0 h-[200%] select-none theme-mask-color
  speed1:active:duration-1000 speed2:active:duration-500 speed3:active:duration-200
  active:transition fromto:!translate-y-[50%] fromto:!bg-transparent"
  @touchstart.self="$emit(`swipeInit`, {event: $event})"
  @touchmove="$emit(`swipeStart`, {event: $event}), $emit(`swipeMove`, {event: $event})"
  @touchend="$emit(`swipeEnd`, {event: $event})">
  <div class="absolute z-[1] right-0 bottom-0 left-0 h-[45%] flex flex-col theme-grad-color theme-shadow-normal">
    <div class="relative z-[9] flex-auto flex items-center p-3 gap-3 theme-grad-color theme-shadow-normal">
      <ItemIconDown class="flex-auto" @click="$emit(`routerBack`)" />
      <p class="flex-even text-xl">{{lang().conf.title}}</p>
      <p class="flex-auto">{{title}}</p>
    </div>
    <ul class="body flex-even p-3 overflow-auto">
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.size.title}}</p>
        <ItemInputRange class="flex-even" :min="1" :max="3" :step="1" v-model="state.size" />
        <p class="flex-auto">{{lang().conf.size.value[state.size]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.speed.title}}</p>
        <ItemInputRange class="flex-even" :min="1" :max="3" :step="1" v-model="state.speed" />
        <p class="flex-auto">{{lang().conf.speed.value[state.speed]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.volume.title}}</p>
        <ItemInputRange class="flex-even" :min="0" :max="3" :step="1" v-model="state.volume" />
        <p class="flex-auto">{{lang().conf.volume.value[state.volume]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.vibrate.title}}</p>
        <ItemInputRadio class="flex-auto" value="off"
          v-model="state.vibrate">{{lang().conf.vibrate.value.off}}</ItemInputRadio>
        <ItemInputRadio class="flex-auto" value="on"
          v-model="state.vibrate">{{lang().conf.vibrate.value.on}}</ItemInputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.theme.title}}</p>
        <ItemInputRadio class="flex-auto" value="light"
          v-model="state.theme">{{lang().conf.theme.value.light}}</ItemInputRadio>
        <ItemInputRadio class="flex-auto" value="dark"
          v-model="state.theme">{{lang().conf.theme.value.dark}}</ItemInputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.lang.title}}</p>
        <ItemInputRadio class="flex-auto" value="en"
          v-model="state.lang">{{lang().conf.lang.value.en}}</ItemInputRadio>
        <ItemInputRadio class="flex-auto" value="jp"
          v-model="state.lang">{{lang().conf.lang.value.jp}}</ItemInputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.save.title}}</p>
        <ItemInputRadio class="flex-auto" value="local"
          v-model="state.save">{{lang().conf.save.value.local}}</ItemInputRadio>
        <ItemInputRadio class="flex-auto" value="rest"
          v-model="state.save">{{lang().conf.save.value.rest}}</ItemInputRadio>
        <ItemInputRadio class="flex-auto" value="gql"
          v-model="state.save">{{lang().conf.save.value.gql}}</ItemInputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.backup.title}}</p>
        <a class="flex-auto" data-testid="ConfSave" @click="$emit(`downloadBackup`, {event: $event})">
          <ItemInputButton class="flex-auto text-theme-fine">{{lang().conf.backup.download}}</ItemInputButton>
        </a>
        <ItemInputFile data-testid="ConfLoad" class="flex-auto text-theme-warn" @change="$emit(`uploadBackup`, {event: $event})">
          {{lang().conf.backup.upload}}</ItemInputFile>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.reset.title}}</p>
        <ItemInputButton class="flex-auto text-theme-fine" @click="$emit(`resetConf`)">
          {{lang().conf.reset.conf}}</ItemInputButton>
        <ItemInputButton class="flex-auto text-theme-warn" @click="$emit(`resetList`)">
          {{lang().conf.reset.list}}</ItemInputButton>
      </li>
    </ul>
  </div>
</div>
</template>
