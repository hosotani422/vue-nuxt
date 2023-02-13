import jp from '@/utils/lang/jp';
import en from '@/utils/lang/en';
import * as conf from '@/composables/page/conf';

const lang: {
  [K in typeof conf[`state`][`data`][`lang`]]: {
    button: {
      cancel: string;
      clear: string;
      ok: string;
    };
    placeholder: {
      list: string;
      main: string;
      sub: string;
      memo: string;
      date: string;
      time: string;
      alarm: string;
    };
    dialog: {
      title: {
        insert: string;
        move: string;
        delete: string;
        reset: string;
        backup: string;
        backupError: string;
        fileError: string;
        alarm: string;
      };
      select: {
        all: string;
        none: string;
      };
      alarm: {
        title: string;
        sort: string[];
        data: {[L: string]: {label: string; value: number;};};
      };
    };
    calendar: {
      week: [string, string, string, string, string, string, string];
    };
    notice: {
      message: string;
      button: string;
    };
    conf: {
      title: string;
      size: {
        title: string;
        value: {[L in `1` | `2` | `3`]: string;};
      };
      speed: {
        title: string;
        value: {[L in `1` | `2` | `3`]: string;};
      };
      volume: {
        title: string;
        value: {[L in `0` | `1` | `2` | `3`]: string;};
      };
      vibrate: {
        title: string;
        value: {[L in `off` | `on`]: string;};
      };
      theme: {
        title: string;
        value: {[L in `light` | `dark`]: string;};
      };
      lang: {
        title: string;
        value: {[L in `en` | `jp`]: string;};
      };
      save: {
        title: string;
        value: {[L in `local` | `rest` | `gql`]: string;};
      };
      backup: {
        title: string;
        download: string;
        upload: string;
      };
      reset: {
        title: string;
        conf: string;
        list: string;
      };
    };
  };
} = {
  jp,
  en,
};

export default lang;
