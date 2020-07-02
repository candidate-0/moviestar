import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

const POPULAR = gql`
  query {
    popular {
      id
      title
    }
  }
`;

const Popular = () => {
  const { data, loading, error } = useQuery(POPULAR);

  if (loading) return "Loading...";
  if (error) return `Error :( ${error}`;

  return (
    <ol>
      {data.popular.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </li>
      ))}
    </ol>
  );
};

export default Popular;
