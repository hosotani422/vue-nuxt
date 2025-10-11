import { vi } from "vitest";
import fs from "fs";
import app from "@/store/page/app";
import list from "@/store/page/list";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import conf from "@/store/page/conf";

export default class Base {
  public static async init(): Promise<void> {
    await app.handle.init();
  }
  public static async loadData(): Promise<void> {
    const backup = fs.readFileSync(`./unit/memosuku.bak`, `utf-8`).split(`\n`);
    app.refer.backId = backup[0]!;
    list.state.data = JSON.parse(backup[1]!);
    main.state.data = JSON.parse(backup[2]!);
    sub.state.data = JSON.parse(backup[3]!);
    conf.state.data = JSON.parse(backup[4]!);
  }
  public static setRouter(): void {
    vi.stubGlobal(`process`, { client: true });
    vi.mock(`vue-router`, () => ({
      useRouter: () => ({
        push: () => {},
        back: () => {},
        currentRoute: { value: { params: { listId: `list1111111111111`, mainId: `main1111111111111` } } },
      }),
    }));
  }
}
