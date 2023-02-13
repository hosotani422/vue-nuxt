import * as Util from '@/utils/base/util';
import constant from '@/utils/const';
import * as Api from '@/api/api';
import * as Cordova from '@/utils/cordova/cordova';
import * as app from '@/composables/page/app';
import * as list from '@/composables/page/list';
import * as main from '@/composables/page/main';
import * as sub from '@/composables/page/sub';
import * as dialog from '@/composables/popup/dialog';

export const variable: {
  swipe: {
    status?: `start` | `move` | `end`;
    target?: HTMLElement;
    x?: number;
    y?: number;
    top?: number;
    listener?: () => void;
  };
} = {
  swipe: {},
};

export const state: {
  data: {
    size: 1 | 2 | 3;
    speed: 1 | 2 | 3;
    volume: 0 | 1 | 2 | 3;
    vibrate: `on` | `off`;
    theme: `light` | `dark`;
    lang: `jp` | `en`;
    save: `local` | `rest` | `gql`;
  };
} = reactive({
  data: constant.init.conf,
});

export const action = {
  initPage: async(): Promise<void> => {
    await action.loadItem();
  },
  actPage: (): void => {
    watch(
      () => app.lib.lodash.cloneDeep(state.data),
      () => {
        action.saveItem();
      },
      {deep: true},
    );
    watch(
      () => app.lib.lodash.cloneDeep(state.data.volume),
      () => {
        action.reactSound();
      },
    );
  },
  loadItem: async(): Promise<void> => {
    state.data = await Api.readConf() ?? constant.init.conf;
  },
  saveItem: (): void => {
    Api.writeConf(state.data);
  },
  reactSound: (): void => {
    constant.sound.volume(state.data.volume / 3);
  },
  reactAlarm: (): void => {
    Cordova.Notice.removeAll();
    for (const listId of list.getter.stateFull().sort) {
      for (const mainId of main.getter.stateFull(listId).sort) {
        const mainUnit = main.getter.stateUnit(listId, mainId);
        if (mainUnit.date) {
          for (const alarmId of mainUnit.alarm) {
            Cordova.Notice.insert({
              title: app.getter.lang().dialog.title.alarm,
              message: `${list.getter.stateUnit(listId).title} ⇒ ${mainUnit.title}`,
              date: app.lib.dayjs(`${mainUnit.date} ${mainUnit.time || `00:00`}`)
                .minute(app.lib.dayjs(`${mainUnit.date} ${mainUnit.time || `00:00`}`).minute() -
                app.getter.lang().dialog.alarm.data[alarmId]!.value).toDate(),
            });
          }
        }
      }
    }
  },
  downloadBackup: (payload: {event: Event;}): void => {
    const data = `${app.getter.listId()}\n` +
      `${JSON.stringify(list.state.data)}\n${JSON.stringify(main.state.data)}\n` +
      `${JSON.stringify(sub.state.data)}\n${JSON.stringify(state.data)}`;
    if (!app.getter.isApp()) {
      const target = payload.event.currentTarget as HTMLElement;
      target.setAttribute(`download`, constant.base.backup);
      target.setAttribute(`href`, `data:text/plain,${encodeURIComponent(data)}`);
    } else {
      Cordova.File.write(constant.base.backup, data,
        (filePath) => {
          dialog.action.open({
            mode: `alert`,
            title: app.getter.lang().dialog.title.backup,
            message: filePath,
            cancel: app.getter.lang().button.ok,
            callback: {
              cancel: () => {
                dialog.action.close();
              },
            },
          });
        }, (errorCode) => {
          dialog.action.open({
            mode: `alert`,
            title: app.getter.lang().dialog.title.backupError,
            message: String(errorCode),
            cancel: app.getter.lang().button.ok,
            callback: {
              cancel: () => {
                dialog.action.close();
              },
            },
          });
        });
    }
  },
  uploadBackup: (payload: {event: Event;}): void => {
    const reader = new FileReader();
    reader.onload = (_event: ProgressEvent<FileReader>) => {
      const fileList = (() => {
        if (typeof _event.target?.result === `string`) {
          return _event.target.result.split(`\n`);
        }
        return [];
      })();
      if (fileList.length === 5 && Util.isJson(fileList[1]) &&
        Util.isJson(fileList[2]) && Util.isJson(fileList[3]) && Util.isJson(fileList[4])) {
        state.data = JSON.parse(fileList[4]!);
        sub.state.data = JSON.parse(fileList[3]!);
        main.state.data = JSON.parse(fileList[2]!);
        list.state.data = JSON.parse(fileList[1]!);
        app.action.routerBack({listId: fileList[0]!});
      } else {
        dialog.action.open({
          mode: `alert`,
          title: app.getter.lang().dialog.title.fileError,
          message: ``,
          cancel: app.getter.lang().button.ok,
          callback: {
            cancel: () => {
              dialog.action.close();
            },
          },
        });
      }
    };
    reader.readAsText((payload.event.target as HTMLInputElement).files![0]!);
  },
  resetConf: (): void => {
    dialog.action.open({
      mode: `confirm`,
      title: app.getter.lang().dialog.title.reset,
      message: ``,
      ok: app.getter.lang().button.ok,
      cancel: app.getter.lang().button.cancel,
      callback: {
        ok: () => {
          dialog.action.close();
          state.data = constant.init.conf;
        },
        cancel: () => {
          dialog.action.close();
        },
      },
    });
  },
  resetList: (): void => {
    dialog.action.open({
      mode: `confirm`,
      title: app.getter.lang().dialog.title.reset,
      message: ``,
      ok: app.getter.lang().button.ok,
      cancel: app.getter.lang().button.cancel,
      callback: {
        ok: () => {
          dialog.action.close();
          sub.state.data = constant.init.sub;
          main.state.data = constant.init.main;
          list.state.data = constant.init.list;
          app.action.routerBack({listId: constant.init.listId});
        },
        cancel: () => {
          dialog.action.close();
        },
      },
    });
  },
  swipeInit: (payload: {event: TouchEvent;}): void => {
    variable.swipe.status = variable.swipe.status === `end` ? `move` : `start`;
    variable.swipe.target = payload.event.currentTarget as HTMLElement;
    variable.swipe.x = payload.event.changedTouches[0]!.clientX;
    variable.swipe.y = payload.event.changedTouches[0]!.clientY;
    const item = variable.swipe.target.getBoundingClientRect();
    variable.swipe.top = item.top + (item.height / 2);
    // スワイプ終了前に再開時
    if (variable.swipe.status === `move`) {
      variable.swipe.target.removeEventListener(`transitionend`, variable.swipe.listener!);
      variable.swipe.target.classList.remove(`v-enter-active`);
      variable.swipe.target.style.transform = `translateY(${variable.swipe.top}px)`;
    }
  },
  swipeStart: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `start`) {
      const changed = payload.event.changedTouches[0]!;
      if (Math.abs(changed.clientX - variable.swipe.x!) + Math.abs(changed.clientY - variable.swipe.y!) > 15) {
        Math.abs(changed.clientX - variable.swipe.x!) < Math.abs(changed.clientY - variable.swipe.y!) ?
          (variable.swipe.status = `move`) : (variable.swipe = {});
      }
    }
  },
  swipeMove: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `move`) {
      const y = variable.swipe.top! + payload.event.changedTouches[0]!.clientY - variable.swipe.y!;
      variable.swipe.target!.style.transform = `translateY(${y > 0 ? y : 0}px)`;
    }
  },
  swipeEnd: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `move`) {
      variable.swipe.status = `end`;
      if (variable.swipe.top! + payload.event.changedTouches[0]!.clientY - variable.swipe.y! > 100) {
        app.action.routerBack();
        variable.swipe = {};
      } else {
        variable.swipe.target!.style.transform = ``;
        variable.swipe.target!.classList.add(`v-enter-active`);
        variable.swipe.target!.addEventListener(`transitionend`, (variable.swipe.listener = () => {
          variable.swipe.target!.removeEventListener(`transitionend`, variable.swipe.listener!);
          variable.swipe.target!.classList.remove(`v-enter-active`);
          variable.swipe = {};
        }));
      }
    } else {
      variable.swipe = {};
    }
  },
};
