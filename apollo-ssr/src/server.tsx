import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import express from 'express';
import 'isomorphic-fetch'
import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      const client = new ApolloClient({
        connectToDevTools: false,
        ssrMode: true,
        link: createHttpLink({
          uri: 'http://localhost:4000',
          credentials: 'same-origin',
          headers: {
            cookie: req.header('Cookie'),
          },
        }),
        cache: new InMemoryCache()
      });

      const context = {};
      const Root = () => (
        <ApolloProvider client={client}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      );
      await getDataFromTree(<Root />);
      const initialApolloState = client.extract();
      const markup = renderToString(<Root/>);

      if (context.url) {
        res.redirect(context.url);
      } else {
        const helmet = Helmet.renderStatic();
        res.status(200).send(
          `<!doctype html>
      <html lang="" ${helmet.htmlAttributes.toString()}>
      <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${markup}</div>
          <script>
            window.__APOLLO_STATE__ = ${JSON.stringify(initialApolloState).replace(/</g, '\\u003c')}
          </script>
      </body>
</ht  ml>`
        );
      }
    } catch (e) {
      console.error(e);
      res.send(500);
    }
  });

export default server;
