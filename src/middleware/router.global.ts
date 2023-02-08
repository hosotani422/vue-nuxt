import constant from '@/utils/const/index';
import * as app from '@/composables/page/app';

export default defineNuxtRouteMiddleware(() => {
  if (!app.state.init) {
    useRouter().push(`/${localStorage.getItem(`route`) ?? constant.init.listId}`);
    app.state.init = true;
  } else if (app.state.listId) {
    useRouter().replace(`/${app.state.listId}`);
    app.state.listId = ``;
  }
});
