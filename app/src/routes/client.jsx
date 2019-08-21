/* eslint-disable  import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import App from '../components/app';
import HomePage from '../containers/home-page';

const routes = [
  {
    component: App,
    routes: [
      {
        component: HomePage,
        path: '/',
      },
    ],
  },
];

export default routes;
