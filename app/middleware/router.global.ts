import app from "@/store/page/app";

export default defineNuxtRouteMiddleware(async () => {
  if (process.client) {
    if (app.refer.routeStart) {
      useRouter().push(`/${localStorage.getItem(`route`) || app.refer.constant.id.inbox}`);
      app.refer.routeStart = false;
    } else if (app.refer.backId) {
      useRouter().replace(`/${app.refer.backId}`);
      app.refer.backId = ``;
    }
  }
});
