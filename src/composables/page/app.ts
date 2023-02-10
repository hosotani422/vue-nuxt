import * as lodash from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import lang from '@/utils/lang/lang';
import constant from '@/utils/const/index';
import * as Api from '@/api/api';
import * as list from '@/composables/page/list';
import * as main from '@/composables/page/main';
import * as sub from '@/composables/page/sub';
import * as conf from '@/composables/page/conf';

export const lib: {
  lodash: typeof lodash;
  dayjs: typeof dayjs;
} = {
  lodash,
  dayjs: (() => {
    dayjs.locale(`ja`);
    return dayjs;
  })(),
};

export const state: {
  init: boolean;
  listId: string;
} = reactive({
  init: false,
  listId: ``,
});

export const getter = reactive({
  isApp: computed(() => (): boolean => false),
  listId: computed(() => (): string => {
    const listId = useRoute().params.listId;
    return listId && !Array.isArray(listId) ? listId : ``;
  }),
  mainId: computed(() => (): string => {
    const mainId = useRoute().params.mainId;
    return mainId && !Array.isArray(mainId) ? mainId : ``;
  }),
  lang: computed(() => (): typeof lang[typeof conf.state.data.lang] => lang[conf.state.data.lang]),
  styleHtml: computed(() => (): string => {
    if (conf.state.data.size === 1) {
      return `font-size: 14px;`;
    } else if (conf.state.data.size === 3) {
      return `font-size: 18px;`;
    }
    return `font-size: 16px;`;
  }),
  classTop: computed(() => (): string[] => [
    `speed${conf.state.data.speed}`,
    conf.state.data.theme,
  ]),
  classFoot: computed(() => (): string => {
    if (window.outerHeight <= 400) {
      return `small`;
    } else if (window.outerHeight >= 720) {
      return `large`;
    }
    return `middle`;
  }),
});

export const action = {
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
    useRouter().push(`/${getter.listId()}/list`);
  },
  routerMain: (payload: {listId: string;}): void => {
    useRouter().push(`/${payload.listId}`);
  },
  routerSub: (payload: {mainId: string;}): void => {
    useRouter().push(`/${getter.listId()}/sub/${payload.mainId}`);
  },
  routerConf: (): void => {
    useRouter().push(`/${getter.listId()}/conf`);
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
