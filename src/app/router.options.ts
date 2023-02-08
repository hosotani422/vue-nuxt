import type {RouterOptions} from '@nuxt/schema';
import PageMain from '@/pages/[listId].vue';
import PageList from '@/pages/[listId]/list.vue';
import PageSub from '@/pages/[listId]/sub/[mainId].vue';
import PageConf from '@/pages/[listId]/conf.vue';

export default <RouterOptions> {
  routes() {
    return [
      {
        path: `/:listId`,
        component: PageMain,
        children: [
          {
            path: `list`,
            component: PageList,
          }, {
            path: `sub/:mainId`,
            component: PageSub,
          }, {
            path: `conf`,
            component: PageConf,
          },
        ],
      },
    ];
  },
};
