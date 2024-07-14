import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserProvider>
  ) 
}
