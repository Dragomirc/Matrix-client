import express from "express";
import path from 'path'
import { matchRoutes } from "react-router-config";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
import createStore from "app/utils/create-store";
import routes from "app/routes/client";

const app = express();
app.use(express.static(path.resolve("app/compiled")));
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
    const content = renderToString(
      <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>)

    const helmet = Helmet.renderStatic();
    const html =  `
            <!DOCTYPE html>
            <html>
            <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            <link rel="stylesheet"  type="text/css" href="/styles/client.css">
            </head>
            <body>
              <div id="root">${content}</div>
              <script>
                  window.INITIAL_STATE = ${serialize(store.getState())}
              </script>
              <script type="text/javascript" src="/scripts/client.js"></script>
            </body>
          </html>
  `;



        if (context.url) {
            return res.redirect(301, context.url);
        }
        if (context.notFound) {
            res.status(404);
        }
        res.send(html);
    });
});
app.listen(process.env.PORT || 8080);
