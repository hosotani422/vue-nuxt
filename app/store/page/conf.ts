import i18next from "i18next";
import app from "@/store/page/app";
import list from "@/store/page/list";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import dialog from "@/store/popup/dialog";

const refer: {
  init: typeof store.state.data;
  swipe: {
    status?: `start` | `move` | `end`;
    elem?: HTMLElement;
    x?: number;
    y?: number;
    top?: number;
  };
} = {
  init: {
    size: 2,
    speed: 2,
    theme: `light`,
    lang: `ja`,
    vibrate: `on`,
  },
  swipe: {},
};

const useStore = defineStore(`conf`, () => {
  const state: {
    data: {
      size: 1 | 2 | 3;
      speed: 1 | 2 | 3;
      theme: `light` | `dark`;
      lang: `ja` | `en`;
      vibrate: `on` | `off`;
    };
  } = reactive({
    data: refer.init,
  });

  const handle = {
    init: async (): Promise<void> => {
      state.data = process.client ? (await JSON.parse(localStorage.getItem(`conf`)!)) || refer.init : refer.init;
      await handle.setLang({ lang: state.data.lang });
      watch(
        () => state.data,
        (data) => {
          process.client && localStorage.setItem(`conf`, JSON.stringify(data));
        },
        { deep: true },
      );
      watch(
        () => state.data.lang,
        async (lang) => {
          await handle.setLang({ lang });
        },
        { flush: `sync` },
      );
    },
    setLang: async (arg: { lang: string }): Promise<void> => {
      await i18next.changeLanguage(arg.lang);
      app.handle.forceUpdate();
    },
    saveLocal: (arg: { elem: HTMLElement }): void => {
      const fileName = app.refer.constant.app.backup;
      const fileData =
        `${app.render.listId()}\n` +
        `${JSON.stringify(list.state.data)}\n` +
        `${JSON.stringify(main.state.data)}\n` +
        `${JSON.stringify(sub.state.data)}\n` +
        `${JSON.stringify(state.data)}`;
      arg.elem.setAttribute(`download`, fileName);
      arg.elem.setAttribute(`href`, `data:text/plain,${encodeURIComponent(fileData)}`);
    },
    saveServer: async (): Promise<void> => {
      dialog.handle.open({
        mode: `confirm`,
        title: i18next.t(`dialog.title.save`),
        message: ``,
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: async () => {
            await $fetch(`/api/backup`, {
              method: `post`,
              body: {
                name: app.refer.constant.app.backup,
                data:
                  `${app.render.listId()}\n` +
                  `${JSON.stringify(list.state.data)}\n` +
                  `${JSON.stringify(main.state.data)}\n` +
                  `${JSON.stringify(sub.state.data)}\n` +
                  `${JSON.stringify(state.data)}`,
              },
            });
            dialog.handle.close();
          },
          cancel: () => {
            dialog.handle.close();
          },
        },
      });
    },
    loadLocal: (arg: { files: FileList }): void => {
      const reader = new FileReader();
      reader.addEventListener(`load`, (event: ProgressEvent<FileReader>) => {
        const files = typeof event.target?.result === `string` ? event.target.result.split(`\n`) : [];
        if (files.length === 5 && app.refer.isJson(files[1], files[2], files[3], files[4])) {
          state.data = JSON.parse(files[4]!);
          list.state.data = JSON.parse(files[1]!);
          main.state.data = JSON.parse(files[2]!);
          sub.state.data = JSON.parse(files[3]!);
          app.handle.routerBack({ listId: files[0]! });
        } else {
          dialog.handle.open({
            mode: `alert`,
            title: i18next.t(`dialog.title.error`),
            message: ``,
            cancel: i18next.t(`button.ok`),
            callback: {
              cancel: () => {
                dialog.handle.close();
              },
            },
          });
        }
      });
      reader.readAsText(arg.files[0]!);
    },
    loadServer: async (): Promise<void> => {
      dialog.handle.open({
        mode: `confirm`,
        title: i18next.t(`dialog.title.load`),
        message: ``,
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: async () => {
            const response = await $fetch(`/api/backup`, { method: `get` });
            const lines = response.split(`\n`);
            list.state.data = JSON.parse(lines[1]!);
            main.state.data = JSON.parse(lines[2]!);
            sub.state.data = JSON.parse(lines[3]!);
            state.data = JSON.parse(lines[4]!);
            app.handle.routerBack({ listId: lines[0]! });
            dialog.handle.close();
          },
          cancel: () => {
            dialog.handle.close();
          },
        },
      });
    },
    resetConf: (): void => {
      dialog.handle.open({
        mode: `confirm`,
        title: i18next.t(`dialog.title.reset`),
        message: ``,
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: () => {
            state.data = refer.init;
            dialog.handle.close();
          },
          cancel: () => {
            dialog.handle.close();
          },
        },
      });
    },
    resetList: (): void => {
      dialog.handle.open({
        mode: `confirm`,
        title: i18next.t(`dialog.title.reset`),
        message: ``,
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: () => {
            list.state.data = list.refer.init;
            main.state.data = main.refer.init;
            sub.state.data = sub.refer.init;
            app.handle.routerBack({ listId: app.refer.constant.id.inbox });
            dialog.handle.close();
          },
          cancel: () => {
            dialog.handle.close();
          },
        },
      });
    },
    swipeInit: (arg: { x: number; y: number }): void => {
      if (!refer.swipe.status) {
        refer.swipe.status = `start`;
        refer.swipe.elem = document.querySelector<HTMLElement>(`div[aria-label='conf']`)!;
        refer.swipe.x = arg.x;
        refer.swipe.y = arg.y;
        refer.swipe.top =
          refer.swipe.elem.getBoundingClientRect().top + refer.swipe.elem.getBoundingClientRect().height / 2;
      }
    },
    swipeStart: (arg: { x: number; y: number }): void => {
      if (refer.swipe.status === `start`) {
        if (Math.abs(arg.x - refer.swipe.x!) + Math.abs(arg.y - refer.swipe.y!) > 15) {
          if (Math.abs(arg.x - refer.swipe.x!) < Math.abs(arg.y - refer.swipe.y!)) {
            refer.swipe.status = `move`;
          } else {
            refer.swipe = {};
          }
        }
      }
    },
    swipeMove: (arg: { y: number }): void => {
      if (refer.swipe.status === `move`) {
        refer.swipe.elem!.style.transform = `translateY(${Math.max(refer.swipe.top! + arg.y - refer.swipe.y!, 0)}px)`;
      }
    },
    swipeEnd: (arg: { y: number }): void => {
      if (refer.swipe.status === `move`) {
        refer.swipe.status = `end`;
        if (refer.swipe.top! + arg.y - refer.swipe.y! > 100) {
          app.handle.routerBack();
          refer.swipe = {};
        } else {
          refer.swipe
            .elem!.animate(
              { transform: `translateY(0px)` },
              { duration: app.handle.getDuration(), easing: `ease-in-out` },
            )
            .addEventListener(`finish`, function listener() {
              refer.swipe.elem!.removeEventListener(`finish`, listener);
              refer.swipe.elem!.style.transform = `translateY(0px)`;
              refer.swipe = {};
            });
        }
      } else {
        refer.swipe = {};
      }
    },
  };

  return { state, handle };
});

const store = useStore(createPinia());

export default { refer, state: store.state, handle: store.handle };
