import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import './index.css';
import App from './App';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from "react-apollo";

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { onError } from "apollo-link-error";
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';


const URI = "http://localhost:4000/graphql";


const httpLink = createHttpLink({
  uri: URI,
  
});
const errorLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    window.location.href = '/login';
  }
});

// use with apollo-client
const link = errorLink.concat(httpLink);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});


const ApolloApp = () => (
    <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
    </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
