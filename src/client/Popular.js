import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Content from "./Content";
import Link from "./Link";

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

  let body;

  if (loading) {
    body = "Loading...";
  } else if (error) {
    body = `Error :( ${error}`;
  } else {
    body = (
      <ol>
        {data.popular.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movie/${id}`}>{title}</Link>
          </li>
        ))}
      </ol>
    );
  }

  return <Content title="Popular movies">{body}</Content>;
};

export default Popular;
