import constant from '@/utils/const/index';
import * as Api from '@/api/api';
import * as app from '@/composables/page/app';

export default defineNuxtRouteMiddleware(async() => {
  if (!app.state.init) {
    app.state.init = true;
    useRouter().push(`/${await Api.readRoute() ?? constant.init.listId}`);
  } else if (app.state.listId) {
    useRouter().replace(`/${app.state.listId}`);
    app.state.listId = ``;
  }
});
