import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import  CartProvider from './providers/cart/cart-provider';
import './index.css';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';

import App from './App';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com',
  credentials: 'same-origin',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

client.query({
  query: gql`
    {
      getCollectionsByTitle(title: "hats") {
        id
        title
        items{
          name
          id
          price
          imageUrl
        }
      }
    }
  `
}).then(res => console.log(res));

ReactDOM.render(
  <ApolloProvider client={client}>
    <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </CartProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
