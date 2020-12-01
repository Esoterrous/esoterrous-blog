import { ApolloProvider } from "@apollo/client";
import graphClient from "./apolloClient";

const WithGraphQL = ({ children }) => {
  return <ApolloProvider client={graphClient}>{children}</ApolloProvider>;
};

export default WithGraphQL;
