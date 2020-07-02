import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useParams, Link } from "react-router-dom";

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

  if (loading) return "Loading...";
  if (error) return `Error :( ${error}`;

  console.log(data);

  return (
    <div>
      <h2>{data.movie.title}</h2>

      <Link to="/">Go back</Link>
    </div>
  );
};

export default Movie;
