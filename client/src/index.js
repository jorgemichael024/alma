import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from "react-apollo";
// import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://192.168.1.102:4000/graphql"
});

// const httpLink = new HttpLink({ uri: 'http://192.168.1.102:4000/graphql' })

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// })


const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
