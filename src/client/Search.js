import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useLocation } from "react-router-dom";
import Content from "./Content";
import Link from "./Link";

const SEARCH = gql`
  query getSearch($query: String!) {
    search(query: $query) {
      id
      title
    }
  }
`;

const Search = () => {
  const query = new URLSearchParams(useLocation().search).get("query");
  const { data, loading, error } = useQuery(SEARCH, { variables: { query } });

  let body;

  if (loading) {
    body = "Loading...";
  } else if (error) {
    body = `Error :( ${error}`;
  } else {
    body = (
      <ol>
        {data.search.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ol>
    );
  }

  return <Content title={`Search results for "${query}"`}>{body}</Content>;
};

export default Search;
