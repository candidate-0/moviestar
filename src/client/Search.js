import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link, useLocation } from "react-router-dom";

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

  if (loading) return "Loading...";
  if (error) return `Error :( ${error}`;

  return (
    <div>
      <h2>Search results for "{query}"</h2>

      <ol>
        {data.search.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Search;
