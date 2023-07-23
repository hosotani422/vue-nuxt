import {vi} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import {mockAnimationsApi} from 'jsdom-testing-mocks';
import fs from 'fs';
import constant from '@/utils/const';
import PageApp from '@/app.vue';
import PageList from '@/components/page/list.vue';
import PageMain from '@/components/page/main.vue';
import PageSub from '@/components/page/sub.vue';
import PageConf from '@/components/page/conf.vue';
import PopupCalendar from '@/components/popup/calendar.vue';
import PopupClock from '@/components/popup/clock.vue';
import PopupDialog from '@/components/popup/dialog.vue';
import PopupNotice from '@/components/popup/notice.vue';
import app from '@/stores/page/app';
import list from '@/stores/page/list';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';
import conf from '@/stores/page/conf';
import calendar from '@/stores/popup/calendar';
import clock from '@/stores/popup/clock';
import dialog from '@/stores/popup/dialog';
import notice from '@/stores/popup/notice';

export default class Fixture {
  public static getTarget(): HTMLElement {
    return {
      style: {transform: ``},
      classList: {add: () => {}, remove: () => {}},
      getBoundingClientRect: () => ({left: 0}),
      addEventListener: (_type: string, listener: Function) => {
        listener();
      },
      removeEventListener: () => {},
    } as unknown as HTMLElement;
  }
  private static getContext(): object {
    return {
      lineWidth: 0,
      font: ``,
      textAlign: ``,
      textBaseline: ``,
      fillStyle: ``,
      strokeStyle: ``,
      canvas: {setAttribute: () => {}},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      rotate: () => {},
      translate: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fillText: () => {},
    };
  }
  public static entryMock(): void {
    process.client = true;
    vi.mock(`vue-router`, () => ({
      useRoute: () => ({params: {listId: list.state.data.sort[0], mainId: main.state.data[list.state.data.sort[0]!]!.sort[0]}}),
      useRouter: () => ({back: () => {}}),
    }));
    mockAnimationsApi();
    dialog.state.check = {
      all: true,
      sort: [`dialog`],
      data: {dialog: {check: false, title: ``}},
    };
    calendar.state.current = `1999/12`;
    clock.refer.hour && Object.assign(clock.refer.hour.value, {getContext: () => (this.getContext())});
    clock.refer.minute && Object.assign(clock.refer.minute.value, {getContext: () => (this.getContext())});
    calendar.refer.area && Object.assign(calendar.refer.area.value, {addEventListener: (_: string, listener: Function) => (listener())});
  }
  public static resetMock(): void {
    vi.restoreAllMocks();
  }
  public static async loadData(): Promise<void> {
    const backup = fs.readFileSync(`./test/memotea.bak`, `utf-8`).split(`\n`);
    app.state.backId = backup[0]!;
    list.state.data = JSON.parse(backup[1]!);
    main.state.data = JSON.parse(backup[2]!);
    sub.state.data = JSON.parse(backup[3]!);
    conf.state.data = JSON.parse(backup[4]!);
    await nextTick();
  }
  public static async mountApp(): Promise<void> {
    mount({
      components: {PageApp},
      template: `<Suspense><PageApp /></Suspense>`,
    }, {
      global: {
        stubs: {
          Html: {template: `<html><slot /></html>`},
          Head: {template: `<head><slot /></head>`},
          Title: {template: `<title><slot /></title>`},
          Meta: true,
          Link: true,
          NoScript: {template: `<noscript><slot /></noscript>`},
          Body: {template: `<body><slot /></body>`},
          NuxtPage: true,
          PopupCalendar: true,
          PopupClock: true,
          PopupDialog: true,
          PopupNotice: true,
        },
        directives: {
          focus: () => {},
        },
      },
    });
    await flushPromises();
  }
  public static async mountList(): Promise<void> {
    mount({
      components: {PageList},
      template:
      `<PageList
        :refer="refer"
        :status="status"
        :title="title"
        :trashId="trashId"
        :getListId="getListId"
        :stateFull="stateFull"
        :stateUnit="stateUnit"
        :classItem="classItem"
        :iconType="iconType"
        :classLimit="classLimit"
        :textCount="textCount"
        @routerBack="routerBack"
        @insertItem="insertItem"
        @copyItem="copyItem"
        @deleteItem="deleteItem"
        @switchEdit="switchEdit"
        @dragInit="dragInit"
        @dragStart="dragStart"
        @dragMove="dragMove"
        @dragEnd="dragEnd"
        @swipeInit="swipeInit"
        @swipeStart="swipeStart"
        @swipeMove="swipeMove"
        @swipeEnd="swipeEnd"
      />`,
      setup: () => ({
        refer: list.refer,
        status: list.state.status,
        title: constant.base.title,
        trashId: constant.base.id.trash,
        getListId: app.getter.listId,
        stateFull: list.getter.stateFull,
        stateUnit: list.getter.stateUnit,
        classItem: list.getter.classItem,
        iconType: list.getter.iconType,
        classLimit: list.getter.classLimit,
        textCount: list.getter.textCount,
        routerBack: app.action.routerBack,
        insertItem: list.action.insertItem,
        copyItem: list.action.copyItem,
        deleteItem: list.action.deleteItem,
        switchEdit: list.action.switchEdit,
        dragInit: list.action.dragInit,
        dragStart: list.action.dragStart,
        dragMove: list.action.dragMove,
        dragEnd: list.action.dragEnd,
        swipeInit: list.action.swipeInit,
        swipeStart: list.action.swipeStart,
        swipeMove: list.action.swipeMove,
        swipeEnd: list.action.swipeEnd,
      }),
    });
    await flushPromises();
  }
  public static async mountMain(): Promise<void> {
    mount({
      components: {PageMain},
      template:
      `<PageMain
        :refer="refer"
        :status="status"
        :lang="lang"
        :listId="listId"
        :listUnit="listUnit"
        :stateFull="stateFull"
        :stateUnit="stateUnit"
        :classItem="classItem"
        :classLimit="classLimit"
        :textCount="textCount"
        @routerList="routerList"
        @routerSub="routerSub"
        @routerConf="routerConf"
        @insertItem="insertItem"
        @copyItem="copyItem"
        @moveItem="moveItem"
        @deleteItem="deleteItem"
        @checkItem="checkItem"
        @switchEdit="switchEdit"
        @dragInit="dragInit"
        @dragStart="dragStart"
        @dragMove="dragMove"
        @dragEnd="dragEnd"
      />`,
      setup: () => ({
        refer: main.refer,
        status: main.state.status,
        lang: app.getter.lang,
        listId: app.getter.listId,
        listUnit: list.getter.stateUnit,
        stateFull: main.getter.stateFull,
        stateUnit: main.getter.stateUnit,
        classItem: main.getter.classItem,
        classLimit: main.getter.classLimit,
        textCount: main.getter.textCount,
        routerList: app.action.routerList,
        routerSub: app.action.routerSub,
        routerConf: app.action.routerConf,
        insertItem: main.action.insertItem,
        copyItem: main.action.copyItem,
        moveItem: main.action.moveItem,
        deleteItem: main.action.deleteItem,
        checkItem: main.action.checkItem,
        switchEdit: main.action.switchEdit,
        dragInit: main.action.dragInit,
        dragStart: main.action.dragStart,
        dragMove: main.action.dragMove,
        dragEnd: main.action.dragEnd,
      }),
    }, {
      global: {
        stubs: {
          ClientOnly: {template: `<div><slot /></div>`},
          RouterView: true,
        },
      },
    });
    await flushPromises();
  }
  public static async mountSub(): Promise<void> {
    mount({
      components: {PageSub, PopupClock},
      template:
      `<PageSub
        :refer="refer"
        :lang="lang"
        :listId="listId"
        :mainId="mainId"
        :mainUnit="mainUnit"
        :stateFull="stateFull"
        :stateUnit="stateUnit"
        :classItem="classItem"
        :textMemo="textMemo"
        :classLimit="classLimit"
        :textAlarm="textAlarm"
        @routerBack="routerBack"
        @inputItem="inputItem"
        @enterItem="enterItem"
        @backItem="backItem"
        @deleteItem="deleteItem"
        @checkItem="checkItem"
        @switchItem="switchItem"
        @switchEdit="switchEdit"
        @inputMemo="inputMemo"
        @openCalendar="openCalendar"
        @openClock="openClock"
        @openAlarm="openAlarm"
        @dragInit="dragInit"
        @dragStart="dragStart"
        @dragMove="dragMove"
        @dragEnd="dragEnd"
        @swipeInit="swipeInit"
        @swipeStart="swipeStart"
        @swipeMove="swipeMove"
        @swipeEnd="swipeEnd"
      />
      <PopupClock
        :refer="clockRefer"
        :state="clockState"
        @close="clockClose"
        @inputHour="clockInputHour"
        @inputMinute="clockInputMinute"
      />`,
      setup: () => ({
        refer: sub.refer,
        lang: app.getter.lang,
        listId: app.getter.listId,
        mainId: app.getter.mainId,
        mainUnit: main.getter.stateUnit,
        stateFull: sub.getter.stateFull,
        stateUnit: sub.getter.stateUnit,
        classItem: sub.getter.classItem,
        textMemo: sub.getter.textMemo,
        classLimit: sub.getter.classLimit,
        textAlarm: sub.getter.textAlarm,
        routerBack: app.action.routerBack,
        inputItem: sub.action.inputItem,
        enterItem: sub.action.enterItem,
        backItem: sub.action.backItem,
        deleteItem: sub.action.deleteItem,
        checkItem: sub.action.checkItem,
        switchItem: sub.action.switchItem,
        switchEdit: sub.action.switchEdit,
        inputMemo: sub.action.inputMemo,
        openCalendar: sub.action.openCalendar,
        openClock: sub.action.openClock,
        openAlarm: sub.action.openAlarm,
        dragInit: sub.action.dragInit,
        dragStart: sub.action.dragStart,
        dragMove: sub.action.dragMove,
        dragEnd: sub.action.dragEnd,
        swipeInit: sub.action.swipeInit,
        swipeStart: sub.action.swipeStart,
        swipeMove: sub.action.swipeMove,
        swipeEnd: sub.action.swipeEnd,
        clockRefer: clock.refer,
        clockState: clock.state,
        clockClose: clock.action.close,
        clockInputHour: clock.action.inputHour,
        clockInputMinute: clock.action.inputMinute,
      }),
    }, {
      global: {
        directives: {
          height: () => {},
        },
      },
    });
    await flushPromises();
  }
  public static async mountConf(): Promise<void> {
    mount({
      components: {PageConf},
      template:
      `<PageConf
        :title="title"
        :state="state"
        :lang="lang"
        @routerBack="routerBack"
        @downloadBackup="downloadBackup"
        @uploadBackup="uploadBackup"
        @resetConf="resetConf"
        @resetList="resetList"
        @swipeInit="swipeInit"
        @swipeStart="swipeStart"
        @swipeMove="swipeMove"
        @swipeEnd="swipeEnd"
      />`,
      setup: () => ({
        title: `${constant.base.title} ${constant.base.version}`,
        state: conf.state.data,
        lang: app.getter.lang,
        routerBack: app.action.routerBack,
        downloadBackup: conf.action.downloadBackup,
        uploadBackup: conf.action.uploadBackup,
        resetConf: conf.action.resetConf,
        resetList: conf.action.resetList,
        swipeInit: conf.action.swipeInit,
        swipeStart: conf.action.swipeStart,
        swipeMove: conf.action.swipeMove,
        swipeEnd: conf.action.swipeEnd,
      }),
    });
    await flushPromises();
  }
  public static async mountCalendar(): Promise<void> {
    mount({
      components: {PopupCalendar},
      template:
      `<PopupCalendar
        :refer="refer"
        :state="state"
        :textWeek="textWeek"
        :textDay="textDay"
        :classDay="classDay"
        @close="close"
        @pageMove="pageMove"
        @swipeInit="swipeInit"
        @swipeStart="swipeStart"
        @swipeMove="swipeMove"
        @swipeEnd="swipeEnd"
      />`,
      setup: () => ({
        refer: calendar.refer,
        state: calendar.state,
        textWeek: calendar.getter.textWeek,
        textDay: calendar.getter.textDay,
        classDay: calendar.getter.classDay,
        close: calendar.action.close,
        pageMove: calendar.action.pageMove,
        swipeInit: calendar.action.swipeInit,
        swipeStart: calendar.action.swipeStart,
        swipeMove: calendar.action.swipeMove,
        swipeEnd: calendar.action.swipeEnd,
      }),
    });
    await flushPromises();
  }
  public static async mountClock(): Promise<void> {
    mount({
      components: {PopupClock},
      template:
      `<PopupClock
        :refer="refer"
        :state="state"
        @close="close"
        @inputHour="inputHour"
        @inputMinute="inputMinute"
      />`,
      setup: () => ({
        refer: clock.refer,
        state: clock.state,
        close: clock.action.close,
        inputHour: clock.action.inputHour,
        inputMinute: clock.action.inputMinute,
      }),
    });
    await flushPromises();
  }
  public static async mountDialog(): Promise<void> {
    mount({
      components: {PopupDialog},
      template:
      `<PopupDialog
        :state="state"
        :lang="lang"
        :stateCheckAll="stateCheckAll"
        @clickCheckAll="clickCheckAll"
      />`,
      setup: () => ({
        state: dialog.state,
        lang: app.getter.lang,
        stateCheckAll: dialog.getter.stateCheckAll,
        clickCheckAll: dialog.action.clickCheckAll,
      }),
    }, {
      global: {
        directives: {
          focus: () => {},
        },
      },
    });
    await flushPromises();
  }
  public static async mountNotice(): Promise<void> {
    mount({
      components: {PopupNotice},
      template:
      `<PopupNotice
        :state="state"
      />`,
      setup: () => ({
        state: notice.state,
      }),
    });
    await flushPromises();
  }
  public static getListId(index: number): string {
    return list.state.data.sort[index]!;
  }
  public static getMainId(index: number): string {
    return main.state.data[this.getListId(0)]!.sort[index]!;
  }
  public static getSubId(index: number): string {
    return sub.state.data[this.getListId(0)]!.data[this.getMainId(0)]!.sort[index]!;
  }
  public static dialogConfirm(): void {
    dialog.state.callback.ok();
  }
  public static dialogText(title: string): void {
    dialog.state.text.value = title;
    dialog.state.callback.ok();
  }
  public static dialogCheck(selectList: string[]): void {
    for (const id of dialog.state.check.sort) {
      dialog.state.check.data[id]!.check = selectList.includes(id);
    }
    dialog.state.callback.ok();
  }
  public static dialogRadio(select: string): void {
    dialog.state.radio.select = select;
    dialog.state.callback.ok();
  }
  public static execNotice(): void {
    notice.state.callback();
  }
  public static execCalendar(date: string): void {
    calendar.state.callback(date);
  }
  public static execClock(hour?: number, minute?: number): void {
    clock.state.callback(hour, minute);
  }
}
