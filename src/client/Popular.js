import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Content from "./Content";
import MovieList from "./MovieList";

const POPULAR = gql`
  query {
    popular {
      id
      title
      releaseDate
      posterURL
    }
  }
`;

const Popular = () => {
  const { data, loading, error } = useQuery(POPULAR);

  let body;

  if (loading) {
    body = "Loading...";
  } else if (error) {
    body = `Error :( ${error}`;
  } else {
    body = <MovieList movies={data.popular} />;
  }

  return <Content title="Popular movies">{body}</Content>;
};

export default Popular;
