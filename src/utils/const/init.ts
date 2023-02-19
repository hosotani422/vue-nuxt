import * as base from '@/utils/const/base';
import * as lists from '@/composables/page/list';
import * as mains from '@/composables/page/main';
import * as subs from '@/composables/page/sub';
import * as confs from '@/composables/page/conf';
import * as calendars from '@/composables/popup/calendar';
import * as clocks from '@/composables/popup/clock';
import * as dialogs from '@/composables/popup/dialog';
import * as notices from '@/composables/popup/notice';

export const listId = base.id.inbox;

export const list: typeof lists.state.data = {
  sort: [base.id.inbox, base.id.trash],
  data: {
    [base.id.inbox]: {title: `Inbox`},
    [base.id.trash]: {title: `Trash`},
  },
};

export const main: typeof mains.state.data = {
  [base.id.inbox]: {sort: [], data: {}},
  [base.id.trash]: {sort: [], data: {}},
};

export const sub: typeof subs.state.data = {
  [base.id.inbox]: {data: {}},
  [base.id.trash]: {data: {}},
};

export const conf: typeof confs.state.data = {
  size: 2,
  speed: 2,
  volume: 1,
  vibrate: `on`,
  theme: `light`,
  lang: `jp`,
  save: `local`,
};

export const calendar: typeof calendars.state = {
  open: false,
  select: ``,
  current: ``,
  cancel: ``,
  clear: ``,
};

export const clock: typeof clocks.state = {
  open: false,
  hour: 0,
  minute: 0,
  cancel: ``,
  clear: ``,
  ok: ``,
};

export const dialog: typeof dialogs.state = {
  open: false,
  mode: `alert`,
  title: ``,
  message: ``,
  text: {
    value: ``,
    placeholder: ``,
  },
  check: {
    all: false,
    sort: [],
    data: {},
  },
  radio: {
    none: false,
    select: ``,
    sort: [],
    data: {},
  },
  ok: ``,
  cancel: ``,
};

export const notice: typeof notices.state = {
  open: false,
  message: ``,
  button: ``,
};
