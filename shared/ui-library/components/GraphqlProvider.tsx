import { useEffect, useState } from 'react';
import { split, HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import Loading from './Loading';
import Error from './Error';

const cache = new InMemoryCache();
export const SERVER_DOMAIN = 'localhost:5000';
export const httpUri = `http://${SERVER_DOMAIN}/graphql`;
export const wsUri = `ws://${SERVER_DOMAIN}/graphql`;

interface Props {
  browser: boolean;
}

const Provider: React.FC<Props> = ({ children, browser = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  let gqClient: ApolloClient<any>;
  if (browser) {
    const httpLink = new HttpLink({
      uri: httpUri,
    });

    const wsLink = new WebSocketLink({
      uri: wsUri,
      options: {
        reconnect: true,
      },
    });

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink,
    );

    gqClient = new ApolloClient({
      link: splitLink,
      cache,
    });
  } else {
    gqClient = new ApolloClient({
      uri: httpUri,
      cache,
    });
  }

  useEffect(() => {
    const check = async () => {
      const response = await fetch(`http://${SERVER_DOMAIN}`);
      if (!response.ok) {
        setError('Server down!');
      }
      setLoading(false);
    };
    if (gqClient) {
      check();
    }
  }, [gqClient]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error text={error} />;
  }

  return <ApolloProvider client={gqClient}>{children}</ApolloProvider>;
};

export default Provider;
