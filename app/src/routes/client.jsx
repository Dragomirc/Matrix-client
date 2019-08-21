import App from "../components/app";
import HomePage from "../containers/home-page";

export default [
    {
        component: App,
        routes: [
            {
                component: HomePage,
                path: "/"
            }
        ]
    }
];
