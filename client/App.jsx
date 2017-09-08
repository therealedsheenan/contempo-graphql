// @flow

import React from 'react';
import { Provider } from 'react-redux';

// graphql related
import ApolloClient from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';

// change routes to split or server
// import routes from './config/routes';
// import routes from '../src/config/routes';
import store from '../src/config/store';
import typeDefs from './schema';

// mock network
const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });


const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});


// components with graphql
const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <ul>
    { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
  </ul>;
};

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

export default () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <div>
        <h1>test</h1>
        <ChannelsListWithData />
      </div>
    </Provider>
  </ApolloProvider>
);
