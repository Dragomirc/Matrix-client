import express from "express";
import { matchRoutes } from "react-router-config";
import createStore from "../utils/create-store";
import renderer from "./renderer";
import routes from "../routes/client";

const app = express();

app.use(express.static("dist"));
app.get("*", (req, res) => {
    const store = createStore(req);
    const promises = matchRoutes(routes, req.path)
        .map(({ route }) => {
            return route.fetchData ? route.fetchData(store) : null;
        })
        .map(promise => {
            if (promise) {
                return new Promise(resolve => {
                    promise.then(resolve).catch(resolve);
                });
            }
        });
    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);
        if (context.url) {
            return res.redirect(301, context.url);
        }
        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    });
});
app.listen(process.env.PORT || 8080);
