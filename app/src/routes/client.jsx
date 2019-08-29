/* eslint-disable  import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import App from "app/components/app";
import HomePage from "app/containers/home-page";
import AddProductPage from "app/containers/add-product";
import ProductsPage from "app/containers/products-page";

const routes = [
    {
        component: App,
        routes: [
            {
                component: HomePage,
                path: "/",
                exact: true
            },
            {
                component: AddProductPage,
                path: "/add-product"
            },
            {
                component: ProductsPage,
                path: "/products"
            }
        ]
    }
];

export default routes;
