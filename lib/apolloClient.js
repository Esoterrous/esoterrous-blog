import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const graphClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://esoterrous.herokuapp.com/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default graphClient;
