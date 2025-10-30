import { mount, flushPromises } from "@vue/test-utils";
import Base from "../base";
import PageApp from "@/app.vue";

export default class App extends Base {
  public static async getWrapper(): Promise<ReturnType<typeof mount>> {
    const wrapper = mount(
      {
        components: { PageApp },
        template: `<Suspense><PageApp /></Suspense>`,
      },
      {
        global: {
          stubs: {
            Html: { template: `<html><slot /></html>` },
            Head: { template: `<head><slot /></head>` },
            Title: { template: `<title>Memotea</title>` },
            Meta: true,
            Link: true,
            NoScript: { template: `<noscript>JavaScript is required</noscript>` },
            Body: { template: `<body><slot /></body>` },
            NuxtPage: true,
            PopupDate: true,
            PopupTime: true,
            PopupDialog: true,
            PopupNotice: true,
          },
          directives: {
            focus: () => ``,
          },
        },
      },
    );
    await flushPromises();
    return wrapper;
  }
}
