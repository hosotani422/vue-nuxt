import { mount } from "@vue/test-utils";
import Base from "../base";
import app from "@/store/page/app";
import conf from "@/store/page/conf";
import PageConf from "@/components/page/conf.vue";

export default class Conf extends Base {
  public static getWrapper(): ReturnType<typeof mount> {
    const wrapper = mount(PageConf, {
      props: { app, conf },
    });
    return wrapper;
  }
}
