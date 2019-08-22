/* eslint-disable  import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import App from 'app/components/app';
import HomePage from 'app/containers/home-page';

const routes = [
    {
        component: App,
        routes: [
            {
                component: HomePage,
                path: '/'
            }
        ]
    }
];

export default routes;
