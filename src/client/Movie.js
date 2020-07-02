import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import Content from "./Content";
import Link from "./Link";

const MOVIE = gql`
  query getMovie($id: ID!) {
    movie(id: $id) {
      id
      title
    }
  }
`;

const Movie = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(MOVIE, { variables: { id } });

  let title, body;

  if (loading) {
    title = "Loading...";
    body = "Loading...";
  } else if (error) {
    title = "Error :(";
    body = error;
  } else {
    title = data.movie.title;
    body = (
      <>
        <p>{data.movie.title}</p>
        <Link to="/">Go back</Link>
      </>
    );
  }

  return <Content title={title}>{body}</Content>;
};

export default Movie;
