import React from "react";
import tw from "twin.macro";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import Content from "./Content";

const MOVIE = gql`
  query getMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      overview
      posterURL
      releaseDate
      revenue
      runtime
      cast {
        id
        name
      }
    }
  }
`;

const Poster = tw.img`
  rounded-md
`;

const List = tw.dl`
  mr-4
`;

const Term = tw.dt`
  font-bold
`;

const Data = tw.dd`
  mb-4
`;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

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
      <div tw="flex">
        <List>
          <Term>Overview</Term>
          <Data>{data.movie.overview}</Data>
          <Term>Released</Term>
          <Data>{data.movie.releaseDate}</Data>
          <Term>Runtime</Term>
          <Data>{data.movie.runtime} minutes</Data>
          {data.movie.revenue > 0 && (
            <>
              <Term>Revenue</Term>
              <Data>{formatter.format(data.movie.revenue)}</Data>
            </>
          )}
          <Term>Cast</Term>
          <Data>
            <ul>
              {data.movie.cast.slice(1, 6).map((actor) => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
          </Data>
        </List>
        <Poster src={data.movie.posterURL} />
      </div>
    );
  }

  return <Content title={title}>{body}</Content>;
};

export default Movie;
