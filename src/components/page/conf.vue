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
      <IconDown class="flex-auto" @click="$emit(`routerBack`)" />
      <p class="flex-even text-xl">{{lang().conf.title}}</p>
      <p class="flex-auto">{{title}}</p>
    </div>
    <ul class="body flex-even p-3 overflow-auto">
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.size.title}}</p>
        <InputRange class="flex-even" :min="1" :max="3" :step="1" v-model="state.size" />
        <p class="flex-auto">{{lang().conf.size.value[state.size]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.speed.title}}</p>
        <InputRange class="flex-even" :min="1" :max="3" :step="1" v-model="state.speed" />
        <p class="flex-auto">{{lang().conf.speed.value[state.speed]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.volume.title}}</p>
        <InputRange class="flex-even" :min="0" :max="3" :step="1" v-model="state.volume" />
        <p class="flex-auto">{{lang().conf.volume.value[state.volume]}}</p>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.vibrate.title}}</p>
        <InputRadio class="flex-auto" value="off"
          v-model="state.vibrate">{{lang().conf.vibrate.value.off}}</InputRadio>
        <InputRadio class="flex-auto" value="on"
          v-model="state.vibrate">{{lang().conf.vibrate.value.on}}</InputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.theme.title}}</p>
        <InputRadio class="flex-auto" value="light"
          v-model="state.theme">{{lang().conf.theme.value.light}}</InputRadio>
        <InputRadio class="flex-auto" value="dark"
          v-model="state.theme">{{lang().conf.theme.value.dark}}</InputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.lang.title}}</p>
        <InputRadio class="flex-auto" value="en"
          v-model="state.lang">{{lang().conf.lang.value.en}}</InputRadio>
        <InputRadio class="flex-auto" value="jp"
          v-model="state.lang">{{lang().conf.lang.value.jp}}</InputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.save.title}}</p>
        <InputRadio class="flex-auto" value="local"
          v-model="state.save">{{lang().conf.save.value.local}}</InputRadio>
        <InputRadio class="flex-auto" value="rest"
          v-model="state.save">{{lang().conf.save.value.rest}}</InputRadio>
        <InputRadio class="flex-auto" value="gql"
          v-model="state.save">{{lang().conf.save.value.gql}}</InputRadio>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.backup.title}}</p>
        <a class="flex-auto" data-testid="ConfSave" @click="$emit(`downloadBackup`, {event: $event})">
          <InputButton class="flex-auto text-theme-fine">{{lang().conf.backup.download}}</InputButton>
        </a>
        <InputFile data-testid="ConfLoad" class="flex-auto text-theme-warn" @change="$emit(`uploadBackup`, {event: $event})">
          {{lang().conf.backup.upload}}</InputFile>
      </li>
      <li class="h-16 flex items-center p-3 gap-4
        border-b-solid border-b-[0.1rem] border-b-font-dark theme-back-color">
        <p class="flex-even">{{lang().conf.reset.title}}</p>
        <InputButton class="flex-auto text-theme-fine" @click="$emit(`resetConf`)">
          {{lang().conf.reset.conf}}</InputButton>
        <InputButton class="flex-auto text-theme-warn" @click="$emit(`resetList`)">
          {{lang().conf.reset.list}}</InputButton>
      </li>
    </ul>
  </div>
</div>
</template>
