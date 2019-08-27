/* eslint-disable  import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import App from 'app/components/app';
import HomePage from 'app/containers/home-page';
import AddProductPage from '../containers/add-product';

const routes = [
  {
    component: App,
    routes: [
      {
        component: HomePage,
        path: '/',
        exact: true
      },
      {
        component: AddProductPage,
        path: '/add-product'
      }
    ]
  }
];

export default routes;
