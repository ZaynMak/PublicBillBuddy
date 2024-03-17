import '../styles/global.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const Layout = ({ children }) => {

  const client = new ApolloClient({
    uri: "http://127.0.0.1:8000/graphql/",
    cache: new InMemoryCache(),
  });


  return (
    <>
      <ApolloProvider client={client}>
      <div className="layout">{children}</div>
      </ApolloProvider>
    </>
  );
};

export default Layout;