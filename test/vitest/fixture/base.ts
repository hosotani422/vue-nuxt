import { vi } from "vitest";
import fs from "fs";
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";

export default class Base {
  public static async loadData(): Promise<void> {
    const backup = fs.readFileSync(`./test/memotea.bak`, `utf-8`).split(`\n`);
    app.state.backId = backup[0]!;
    list.state.data = JSON.parse(backup[1]!);
    main.state.data = JSON.parse(backup[2]!);
    sub.state.data = JSON.parse(backup[3]!);
    conf.state.data = JSON.parse(backup[4]!);
    constant.base.id.inbox = `list000`;
    constant.base.id.trash = `list900`;
  }
  public static setRouter(): void {
    vi.mock(`vue-router`, () => ({
      useRoute: () => ({
        params: { listId: `list100`, mainId: `main110` },
      }),
    }));
  }
}
