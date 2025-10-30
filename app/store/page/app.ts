import * as Vue from "vue";
import i18next from "i18next";
import * as Zod from "zod";
import list from "@/store/page/list";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import conf from "@/store/page/conf";
import { ja } from "@/locale/ja";
import { en } from "@/locale/en";

const refer: {
  routeStart: boolean;
  backId: string;
  constant: {
    id: { [K in `inbox` | `trash` | `main` | `sub`]: string };
    app: { [K in `name` | `version` | `backup`]: string };
  };
  validation: { empty: () => Zod.ZodType };
  isJson: (...itemList: unknown[]) => boolean;
} = {
  routeStart: true,
  backId: ``,
  constant: {
    id: {
      inbox: `list0000000000000`,
      trash: `list9999999999999`,
      main: `main0000000000000`,
      sub: `sub0000000000000`,
    },
    app: {
      name: `Memotea`,
      version: `1.0.0`,
      backup: `memotea.bak`,
    },
  },
  validation: {
    empty: () => {
      return Zod.string().trim().min(1, i18next.t(`validation.empty`));
    },
  },
  isJson: (...itemList: unknown[]): boolean => {
    try {
      for (const item of itemList) {
        if (typeof item === `string`) {
          JSON.parse(item);
        } else {
          return false;
        }
      }
    } catch {
      return false;
    }
    return true;
  },
};

const useStore = defineStore(`app`, () => {
  const state: {
    updateKey: string;
  } = reactive({
    updateKey: ``,
  });

  const render = reactive({
    listId: computed(() => (): string => {
      return (useRouter()?.currentRoute.value.params.listId as string) || ``;
    }),
    mainId: computed(() => (): string => {
      return (useRouter()?.currentRoute.value.params.mainId as string) || ``;
    }),
    attrClass: computed(() => (arg: { attrs: Vue.SetupContext[`attrs`] }): Vue.SetupContext[`attrs`] => {
      return Object.fromEntries(Object.entries(arg.attrs).filter(([key]) => key === `class`));
    }),
    attrAlmost: computed(() => (arg: { attrs: Vue.SetupContext[`attrs`] }): Vue.SetupContext[`attrs`] => {
      return Object.fromEntries(Object.entries(arg.attrs).filter(([key]) => key !== `class`));
    }),
    classTheme: computed(() => (): { [K in `light` | `dark`]: boolean } => {
      return {
        light: conf.state.data.theme === `light`,
        dark: conf.state.data.theme === `dark`,
      };
    }),
    classSize: computed(() => (): { [K in `text-sm` | `text-base` | `text-lg`]: boolean } => {
      return {
        "text-sm": conf.state.data.size === 1,
        "text-base": conf.state.data.size === 2,
        "text-lg": conf.state.data.size === 3,
      };
    }),
    classSpeed: computed(() => (): { [K in `slow` | `just` | `fast`]: boolean } => {
      return {
        slow: conf.state.data.speed === 1,
        just: conf.state.data.speed === 2,
        fast: conf.state.data.speed === 3,
      };
    }),
  });

  const handle = {
    init: async (): Promise<void> => {
      await i18next.init({
        lng: `ja`,
        resources: {
          ja: { translation: ja },
          en: { translation: en },
        },
      });
      await conf.handle.init();
      await sub.handle.init();
      await main.handle.init();
      await list.handle.init();
      handle.clearTrash();
    },
    getDuration: (): number => {
      if (conf.state.data.speed === 1) {
        return 500;
      } else if (conf.state.data.speed === 3) {
        return 100;
      }
      return 250;
    },
    routerList: (): void => {
      useRouter().push(`/${render.listId()}/list`);
    },
    routerMain: (arg: { listId: string }): void => {
      useRouter().push(`/${arg.listId}`);
    },
    routerSub: (arg: { mainId: string }): void => {
      useRouter().push(`/${render.listId()}/${arg.mainId}`);
    },
    routerConf: (): void => {
      useRouter().push(`/${render.listId()}/conf`);
    },
    routerBack: (arg?: { listId: string }): void => {
      refer.backId = arg?.listId || ``;
      refer.backId && localStorage.setItem(`route`, refer.backId);
      useRouter().back();
    },
    clearTrash: (): void => {
      const trashId = refer.constant.id.trash;
      main.state.data[trashId] = { sort: [], data: {} };
      sub.state.data[trashId] = { data: {} };
    },
    forceUpdate: (): void => {
      state.updateKey = String(new Date().valueOf());
    },
  };

  return { state, render, handle };
});

const store = useStore(createPinia());

export default { refer, state: store.state, render: store.render, handle: store.handle };
