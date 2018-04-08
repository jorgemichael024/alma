import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import schema from './data/schema';

import MongooseConnector from './connectors/MongooseConnector';

const GRAPHQL_PORT = 4000;  

const graphQLServer = express();

graphQLServer.use(cors());
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
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
