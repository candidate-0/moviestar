import React from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";

const TH = tw.th`
  px-6 py-3
  border-b border-gray-200
  text-sm text-gray-500
  uppercase tracking-wider
  text-left
`;

const TD = tw.td`
  ml-2 my-2
  text-xl
`;

const TR = tw.tr`
  flex
  cursor-pointer
  border border-transparent
  text-red-400 hover:text-red-700
  hover:shadow-lg hover:border-gray-300
  transition ease-in-out duration-100
`;

const MovieList = ({ movies }) => (
  <table tw="w-full">
    <thead tw="hidden">
      <tr>
        <TH>Poster</TH>
        <TH>Movie</TH>
        <TH>Year</TH>
      </tr>
    </thead>
    <tbody>
      {movies.map(({ id, title, posterURL, releaseDate }) => (
        <TR key={id}>
          <TD tw="w-16">
            <Link to={`/movie/${id}`}>
              {posterURL && <img src={posterURL} tw="w-12 rounded-sm" />}
            </Link>
          </TD>
          <TD tw="flex-grow my-auto">
            <Link to={`/movie/${id}`} tw="block w-full h-full">
              {title} {releaseDate && `(${parseInt(releaseDate, 10)})`}
            </Link>
          </TD>
        </TR>
      ))}
    </tbody>
  </table>
);

export default MovieList;
