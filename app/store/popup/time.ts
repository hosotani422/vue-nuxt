import * as datefns from "date-fns";
import conf from "@/store/page/conf";

const refer: {
  init: typeof store.state;
  callback: (arg?: { hour: number; minute: number }) => void;
} = {
  init: {
    open: false,
    hour: 0,
    minute: 0,
    cancel: ``,
    clear: ``,
    ok: ``,
  },
  callback: () => ``,
};

const useStore = defineStore(`time`, () => {
  const state: {
    open: boolean;
    hour: number;
    minute: number;
    cancel: string;
    clear: string;
    ok: string;
  } = reactive(refer.init);

  const handle = {
    open: async (arg: {
      time: string;
      cancel: typeof state.cancel;
      clear: typeof state.clear;
      ok: typeof state.ok;
      callback: typeof refer.callback;
    }): Promise<void> => {
      state.open = true;
      state.hour = datefns.getHours(`2000/1/1 ${arg.time || `00:00`}`);
      state.minute = datefns.getMinutes(`2000/1/1 ${arg.time || `00:00`}`);
      state.cancel = arg.cancel;
      state.clear = arg.clear;
      state.ok = arg.ok;
      refer.callback = arg.callback;
      await nextTick();
      handle.drawCanvas({ type: `hour` });
      handle.drawCanvas({ type: `minute` });
    },
    close: (): void => {
      state.open = false;
    },
    inputTime: (arg: { type: `hour` | `minute`; x: number; y: number }): void => {
      const elem = document.querySelector<HTMLCanvasElement>(
        `div[aria-label='time'] canvas:nth-of-type(${arg.type === `hour` ? `1` : `2`})`,
      )!;
      const radius = elem.getBoundingClientRect().height / 2;
      const x = arg.x - elem.getBoundingClientRect().left;
      const y = arg.y - elem.getBoundingClientRect().top;
      const angle = (Math.atan((radius - y) / (radius - x)) * 360) / (Math.PI * 2) + (x >= radius ? 90 : 270);
      if (arg.type === `hour`) {
        const inner = Math.sqrt((radius - x) ** 2 + (radius - y) ** 2) < radius * 0.66;
        state.hour = (Math.round(angle / 30) === 12 ? 0 : Math.round(angle / 30)) + (inner ? 12 : 0);
      } else {
        state.minute = Math.round(angle / 6) === 60 ? 0 : Math.round(angle / 6);
      }
      handle.drawCanvas({ type: arg.type });
    },
    drawCanvas: (arg: { type: `hour` | `minute` }): void => {
      const elem = document.querySelector<HTMLCanvasElement>(
        `div[aria-label='time'] canvas:nth-of-type(${arg.type === `hour` ? `1` : `2`})`,
      )!;
      const radius = elem.getBoundingClientRect().height / 2;
      elem.setAttribute(`width`, `${radius * 2}px`);
      elem.setAttribute(`height`, `${radius * 2}px`);
      const ctx = elem.getContext(`2d`)!;
      // 基準位置
      ctx.translate(radius, radius);
      // 外側円
      handle.drawCircle({
        ctx,
        x: 0,
        y: 0,
        radius,
        color: conf.state.data.theme === `light` ? `#dddddd` : `#000000`,
      });
      // 中心円
      handle.drawCircle({ ctx, x: 0, y: 0, radius: 3, color: `#1188dd` });
      // 回転開始
      ctx.rotate(arg.type === `hour` ? state.hour * 30 * (Math.PI / 180) : state.minute * 6 * (Math.PI / 180));
      // 選択円
      handle.drawCircle({
        ctx,
        x: 0,
        y: arg.type === `hour` ? radius * (state.hour > 11 ? -0.52 : -0.82) : radius * -0.82,
        radius: (() => {
          if (conf.state.data.size === 1) {
            return 18;
          } else if (conf.state.data.size === 3) {
            return 22;
          }
          return 20;
        })(),
        color: `#1188dd`,
      });
      // 選択線
      handle.drawLine({
        ctx,
        from: { x: 0, y: 0 },
        to: arg.type === `hour` ? { x: 0, y: radius * (state.hour > 11 ? -0.52 : -0.82) } : { x: 0, y: radius * -0.82 },
        width: 1,
        color: `#1188dd`,
      });
      // 回転終了
      ctx.rotate(arg.type === `hour` ? -state.hour * 30 * (Math.PI / 180) : -state.minute * 6 * (Math.PI / 180));
      if (arg.type === `hour`) {
        // 外側文字
        handle.drawChar({
          ctx,
          list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          select: state.hour,
          size: `1rem`,
          radius: radius * 0.82,
          color: conf.state.data.theme === `dark` ? `#ffffff` : `#333333`,
        });
        // 内側文字
        handle.drawChar({
          ctx,
          list: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
          select: state.hour,
          size: `0.8rem`,
          radius: radius * 0.52,
          color: conf.state.data.theme === `dark` ? `#ffffff` : `#333333`,
        });
      } else {
        // 文字
        handle.drawChar({
          ctx,
          list: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
          select: state.minute,
          size: `1rem`,
          radius: radius * 0.82,
          color: conf.state.data.theme === `dark` ? `#ffffff` : `#333333`,
        });
      }
    },
    drawCircle: (arg: { ctx: CanvasRenderingContext2D; x: number; y: number; radius: number; color: string }): void => {
      arg.ctx.beginPath();
      arg.ctx.arc(arg.x, arg.y, arg.radius, 0, 360 * (Math.PI / 180), false);
      arg.ctx.fillStyle = arg.color;
      arg.ctx.fill();
    },
    drawLine: (arg: {
      ctx: CanvasRenderingContext2D;
      from: { x: number; y: number };
      to: { x: number; y: number };
      width: number;
      color: string;
    }): void => {
      arg.ctx.beginPath();
      arg.ctx.moveTo(arg.from.x, arg.from.y);
      arg.ctx.lineTo(arg.to.x, arg.to.y);
      arg.ctx.lineWidth = arg.width;
      arg.ctx.strokeStyle = arg.color;
      arg.ctx.stroke();
    },
    drawChar: (arg: {
      ctx: CanvasRenderingContext2D;
      list: number[];
      select: number;
      radius: number;
      size: string;
      color: string;
    }): void => {
      arg.ctx.font = `normal ${arg.size} sans-serif`;
      arg.ctx.textAlign = `center`;
      arg.ctx.textBaseline = `middle`;
      for (const [i, item] of arg.list.entries()) {
        arg.ctx.fillStyle = item === arg.select ? `#ffffff` : arg.color;
        arg.ctx.fillText(
          String(item),
          arg.radius * Math.sin((i + 6) * -30 * (Math.PI / 180)),
          arg.radius * Math.cos((i + 6) * -30 * (Math.PI / 180)),
        );
      }
    },
  };

  return { state, handle };
});

const store = useStore(createPinia());

export default { refer, state: store.state, handle: store.handle };
