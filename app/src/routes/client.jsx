/* eslint-disable  import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import App from "app/components/app";
import HomePage from "app/containers/home-page";
import AddProductPage from "app/containers/add-product-page";
import ProductsPage from "app/containers/products-page";
import AdminProductsPage from "app/containers/admin-products-page";
import EditProductPage from "app/containers/edit-product-page";
import ProductDetailsPage from "app/containers/product-details-page";
import SignupPage from "app/containers/signup-page";
import LoginPage from "app/containers/login-page";
import ResetPasswordPage from "../containers/reset-password-page";
import NewPasswordPage from "../containers/new-password-page";

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
                component: LoginPage,
                path: "/login"
            },
            {
                component: EditProductPage,
                path: "/edit/:productId"
            },
            {
                component: ProductsPage,
                path: "/products",
                exact: true
            },
            {
                component: AdminProductsPage,
                path: "/admin-products",
                exact: true
            },
            {
                component: ProductDetailsPage,
                path: "/products/:productId"
            },
            {
                component: ResetPasswordPage,
                path: "/reset-password"
            },
            {
                component: NewPasswordPage,
                path: "/new-password/:resetToken"
            }
        ]
    }
];

export default routes;
