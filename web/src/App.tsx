import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHelloQuery } from "./generated/graphql";
// import helloQuery from './graphql/hello'

const App: React.FC = () => {
  const { data, loading } = useHelloQuery();

  if (loading || !data) return <div>loading</div>;
  return <div className="App">{data.hello}</div>;
};

export default App;
