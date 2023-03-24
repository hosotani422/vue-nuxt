import * as Api from '@/api/api';
import app from '@/stores/page/app';

export default defineNuxtRouteMiddleware(async() => {
  if (process.client) {
    if (!app.state.initClient) {
      app.state.initClient = true;
      useRouter().push(`/${await Api.readRoute()}`);
    } else if (app.state.listId) {
      useRouter().replace(`/${app.state.listId}`);
      app.state.listId = ``;
    }
  } else if (!app.state.initServer) {
    app.state.initServer = true;
    useRouter().push(`/${await Api.readRoute()}`);
  }
});
