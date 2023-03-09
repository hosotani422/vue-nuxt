import * as Pinia from 'pinia';
import * as lodash from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import lang from '@/utils/lang/lang';
import constant from '@/utils/const/index';
import * as Api from '@/api/api';
import list from '@/stores/page/list';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';
import conf from '@/stores/page/conf';

const lib: {
  lodash: typeof lodash;
  dayjs: typeof dayjs;
} = {
  lodash,
  dayjs: (() => {
    dayjs.locale(`ja`);
    return dayjs;
  })(),
};

const useStore = defineStore(`app`, () => {
  const state: {
    initServer: boolean;
    initClient: boolean;
    listId: string;
  } = reactive({
    initServer: false,
    initClient: false,
    listId: ``,
  });

  const getter = {
    isApp: computed(() => (): boolean => false),
    listId: computed(() => (): string => {
      const listId = useRoute().params.listId;
      return listId && !Array.isArray(listId) ? listId : ``;
    }),
    mainId: computed(() => (): string => {
      const mainId = useRoute().params.mainId;
      return mainId && !Array.isArray(mainId) ? mainId : ``;
    }),
    lang: computed(() => (): typeof lang[typeof conf[`state`][`data`][`lang`]] => lang[conf.state.data.lang]),
    styleHtml: computed(() => (): string => {
      if (conf.state.data.size === 1) {
        return `font-size: 14px;`;
      } else if (conf.state.data.size === 3) {
        return `font-size: 18px;`;
      }
      return `font-size: 16px;`;
    }),
    classTop: computed(() => (): string => `speed${conf.state.data.speed} ${conf.state.data.theme}`),
    classFoot: computed(() => (): string => {
      if (process.client && window.outerHeight <= 400) {
        return `small`;
      } else if (process.client && window.outerHeight >= 720) {
        return `large`;
      }
      return `middle`;
    }),
  };

  const action = {
    initPage: async(): Promise<void> => {
      await conf.action.initPage();
      await sub.action.initPage();
      await main.action.initPage();
      await list.action.initPage();
      action.clearTrash();
      list.action.actPage();
      main.action.actPage();
      sub.action.actPage();
      conf.action.actPage();
    },
    saveRoute: (payload: {listId: string;}): void => {
      Api.writeRoute(payload.listId);
    },
    routerList: (): void => {
      useRouter().push(`/${getter.listId.value()}/list`);
    },
    routerMain: (payload: {listId: string;}): void => {
      useRouter().push(`/${payload.listId}`);
    },
    routerSub: (payload: {mainId: string;}): void => {
      useRouter().push(`/${getter.listId.value()}/sub/${payload.mainId}`);
    },
    routerConf: (): void => {
      useRouter().push(`/${getter.listId.value()}/conf`);
    },
    routerBack: (payload?: {listId: string;}): void => {
      state.listId = payload?.listId || ``;
      payload?.listId && action.saveRoute({listId: state.listId});
      useRouter().back();
    },
    clearTrash: (): void => {
      main.state.data[constant.base.id.trash] = {sort: [], data: {}};
      sub.state.data[constant.base.id.trash] = {data: {}};
    },
  };

  return {state, getter, action};
});

const store = useStore(Pinia.createPinia());

export default {lib, state: store.state, getter: store.getter, action: store.action};
