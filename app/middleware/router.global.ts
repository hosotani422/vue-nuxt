import Api from "@/api/api";
import app from "@/stores/page/app";

export default defineNuxtRouteMiddleware(async () => {
  if (process.client) {
    if (app.refer.routeStart) {
      useRouter().push(`/${await Api.readRoute()}`);
      app.refer.routeStart = false;
    } else if (app.refer.backId) {
      useRouter().replace(`/${app.refer.backId}`);
      app.refer.backId = ``;
    }
  }
});
