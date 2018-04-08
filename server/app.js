import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from "express-jwt";
import schema from './data/schema';
import user from './routes/user';

import MongooseConnector from './connectors/MongooseConnector';
import authMiddleware from './middlewares/auth';

const GRAPHQL_PORT = 4000;  

const graphQLServer = express();

graphQLServer.use(cors());
graphQLServer.use('/user', bodyParser.json(), user);
graphQLServer.use(bodyParser.urlencoded({ extended: false }));
graphQLServer.use('/graphql', 
  bodyParser.json(), 
  authMiddleware,
  graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


MongooseConnector.startConnection({
  onConnectionOpened: () => {
    graphQLServer.listen(GRAPHQL_PORT, () =>
      console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
      )
    );
  }
})
