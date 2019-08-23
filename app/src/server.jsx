/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable  no-useless-escape */
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import fs from 'fs';
import md5file from 'md5-file';
import { matchRoutes, renderRoutes } from 'react-router-config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import createStore from 'app/utils/create-store';
import routes from 'app/routes/client';

const app = express();
app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: 'app/views',
    helpers: {
        createMetaTags: ({
            title, link, meta, script, style
        }) => `${title.toString()}${link.toString()}${meta.toString()}${style.toString()}${script.toString()}`,
        createHtmlTag: ({ htmlAttributes }) => `<html class="noscript" lang="en" ${
            htmlAttributes ? htmlAttributes.toString() : ''
        }>`,
        createBodyTag: ({ bodyAttributes }) => `<body ${
            bodyAttributes ? bodyAttributes.toString() : ''
        }>`
    }

}));
app.set('view engine', '.hbs');
app.set('views', 'app/views');
app.use((req, res, next) => {
    req.url = req.url.replace(
        /\/([^\/]+)\.[0-9a-f]+\.(css|js|jpg|png|gif|svg)$/,
        '/$1.$2'
    );
    next();
});

app.use(express.static(path.resolve('app/compiled')));
app.get('*', (req, res) => {
    const store = createStore(req);
    const promises = matchRoutes(routes, req.path)
        .map(({ route }) => (route.fetchData ? route.fetchData(store) : null))
        .map((promise) => {
            if (promise) {
                return new Promise((resolve) => {
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
            </Provider>
        );

           if (context.url) {
            return res.redirect(301, context.url);
        }
        if (context.notFound) {
            res.status(404);
        }
        const params = {
            content,
            helmet: Helmet.renderStatic(),
            vendorstyle: fs.existsSync(
                path.resolve('app/compiled/styles/vendor.css')
            )
                ? `/styles/vendor.${md5file.sync('./app/compiled/styles/vendor.css')}.css`
                : null,
            css: fs.existsSync(
                path.resolve('app/compiled/styles/client.css')
            )
                ? `/styles/client.${md5file.sync('./app/compiled/styles/client.css')}.css`
                : null,
            script: fs.existsSync(
                path.resolve('app/compiled/scripts/client.js')
            )
                ? `/scripts/client.${md5file.sync('./app/compiled/scripts/client.js')}.js`
                : null,
            vendor: fs.existsSync(
                path.resolve('app/compiled/scripts/vendor.js')
            )
                ? `/scripts/vendor.${md5file.sync('./app/compiled/scripts/vendor.js')}.js`
                : null,
            polyfill: fs.existsSync(
                path.resolve('app/compiled/scripts/polyfill.js')
            )
                ? `/scripts/polyfill.${md5file.sync('./app/compiled/scripts/polyfill.js')}.js`
                : null,
            store: serialize(store.getState())
        };
        res.render('index', params);
    });
});
app.listen(process.env.PORT || 8080);
