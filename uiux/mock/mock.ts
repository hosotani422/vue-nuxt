import app from "@/store/page/app";
import list from "@/store/page/list";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import conf from "@/store/page/conf";

export default async (): Promise<void> => {
  await app.handle.init();
  list.state.data = {
    sort: [``, ...list.refer.init.sort],
    data: {
      "": { title: `listTitle` },
      ...list.refer.init.data,
    },
  };
  main.state.data = {
    "": {
      sort: [``, `1`, `2`],
      data: {
        "": {
          check: false,
          title: `mainTitle`,
          task: true,
          date: ``,
          time: ``,
          alarm: [],
        },
        "1": {
          check: false,
          title: `mainTitle1`,
          task: true,
          date: ``,
          time: ``,
          alarm: [],
        },
        "2": {
          check: true,
          title: `mainTitle2`,
          task: true,
          date: ``,
          time: ``,
          alarm: [],
        },
      },
    },
    ...main.refer.init,
  };
  sub.state.data = {
    "": {
      data: {
        "": {
          sort: [``, `1`, `2`],
          data: {
            "": {
              check: false,
              title: `subTitle`,
            },
            "1": {
              check: false,
              title: `subTitle1`,
            },
            "2": {
              check: true,
              title: `subTitle2`,
            },
          },
        },
        "1": {
          sort: [`11`],
          data: {
            "11": {
              check: false,
              title: `subTitle11`,
            },
          },
        },
        "2": {
          sort: [`21`],
          data: {
            "21": {
              check: false,
              title: `subTitle21`,
            },
          },
        },
      },
    },
    ...sub.refer.init,
  };
  conf.state.data = {
    ...conf.refer.init,
  };
};
