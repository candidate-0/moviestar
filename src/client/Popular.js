import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Content from "./Content";
import Error from "./Error";
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

  let title = "Popular movies";
  let body;

  if (loading) {
    body = "Loading...";
  } else if (error) {
    title = "Something's not right. 🤔";
    body = <Error error={error} />;
  } else {
    body = <MovieList movies={data.popular} />;
  }

  return <Content title={title}>{body}</Content>;
};

export default Popular;
