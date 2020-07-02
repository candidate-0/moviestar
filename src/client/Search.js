import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useLocation } from "react-router-dom";
import Content from "./Content";
import MovieList from "./MovieList";

const SEARCH = gql`
  query getSearch($query: String!) {
    search(query: $query) {
      id
      title
      posterURL
      releaseDate
    }
  }
`;

const Search = () => {
  const query = new URLSearchParams(useLocation().search).get("query");
  const { data, loading, error } = useQuery(SEARCH, { variables: { query } });

  let title = `Search results for "${query}"`;
  let body;

  if (!query) {
    title = "Try searching for something 🔎";
    body = <p>...and you'll see it here!</p>;
  } else if (loading) {
    body = "Loading...";
  } else if (error) {
    body = `Error :( ${error}`;
  } else {
    body = <MovieList movies={data.search} />;
  }

  return <Content title={title}>{body}</Content>;
};

export default Search;
