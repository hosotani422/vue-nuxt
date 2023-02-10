import lang from '@/utils/lang/lang';

const jp: typeof lang[`jp`] = {
  button: {
    cancel: `キャンセル`,
    clear: `クリア`,
    ok: `決定`,
  },
  placeholder: {
    list: `リスト`,
    main: `タスク`,
    sub: `サブタスク`,
    memo: `メモ`,
    date: `日付`,
    time: `時刻`,
    alarm: `アラーム`,
  },
  dialog: {
    title: {
      insert: `新規登録`,
      move: `移動先の選択`,
      delete: `本当に削除しますか`,
      reset: `本当にリセットしますか`,
      backup: `バックアップが完了しました`,
      backupError: `バックアップが失敗しました`,
      fileError: `ファイルの形式が違います`,
      alarm: `Memotea アラーム`,
    },
    select: {
      all: `全選択`,
      none: `未選択`,
    },
    alarm: {
      title: `通知タイミングの選択`,
      sort: [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`],
      data: {
        '1': {label: `時刻通り`, value: 0},
        '2': {label: `5分前`, value: 5},
        '3': {label: `10分前`, value: 10},
        '4': {label: `15分前`, value: 15},
        '5': {label: `30分前`, value: 30},
        '6': {label: `1時間前`, value: 60},
        '7': {label: `2時間前`, value: 120},
        '8': {label: `3時間前`, value: 180},
        '9': {label: `6時間前`, value: 360},
        '10': {label: `12時間前`, value: 720},
        '11': {label: `1日前`, value: 1440},
        '12': {label: `2日前`, value: 2880},
      },
    },
  },
  calendar: {
    week: [`日`, `月`, `火`, `水`, `木`, `金`, `土`],
  },
  notice: {
    message: `削除が完了しました`,
    button: `元に戻す`,
  },
  conf: {
    title: `設定`,
    size: {
      title: `文字サイズ`,
      value: {
        '1': `小`,
        '2': `中`,
        '3': `大`,
      },
    },
    speed: {
      title: `アニメ速度`,
      value: {
        '1': `低`,
        '2': `中`,
        '3': `高`,
      },
    },
    volume: {
      title: `音量`,
      value: {
        '0': `無`,
        '1': `小`,
        '2': `中`,
        '3': `大`,
      },
    },
    vibrate: {
      title: `振動`,
      value: {
        off: `無`,
        on: `有`,
      },
    },
    theme: {
      title: `テーマ`,
      value: {
        light: `明`,
        dark: `暗`,
      },
    },
    lang: {
      title: `言語`,
      value: {
        en: `英語`,
        jp: `日本語`,
      },
    },
    save: {
      title: `自動保存`,
      value: {
        local: `ローカル`,
        network: `ネットワーク`,
      },
    },
    backup: {
      title: `保存ファイル`,
      download: `保存`,
      upload: `復元`,
    },
    reset: {
      title: `初期化`,
      conf: `設定`,
      list: `メモ`,
    },
  },
};

export default jp;
