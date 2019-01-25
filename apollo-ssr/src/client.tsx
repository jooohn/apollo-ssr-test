import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http'
import 'isomorphic-fetch'
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hydrate } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import App from './App';

const client = new ApolloClient({
  connectToDevTools: true,
  link: createHttpLink({
    uri: 'http://localhost:4000',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
