/* eslint-disable  import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import App from "app/components/app";
import HomePage from "app/containers/home-page";
import AddProductPage from "app/containers/add-product-page";
import ProductsPage from "app/containers/products-page";
import EditProductPage from "app/containers/edit-product-page";
import ProductDetailsPage from "app/containers/product-details-page";
import SignupPage from "app/containers/signup-page";

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
                component: SignupPage,
                path: "/signup"
            },
            {
                component: EditProductPage,
                path: "/edit/:productId"
            },
            {
                component: ProductsPage,
                path: ["/products", "/admin-products"],
                exact: true
            },
            {
                component: ProductDetailsPage,
                path: "/products/:productId"
            }
        ]
    }
];

export default routes;
