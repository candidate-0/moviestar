import React from "react";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import SearchBar from "./SearchBar";

const PageTitle = tw.h1`
  my-4 mx-auto
  text-5xl font-black
  hover:text-red-500
  transition ease-in-out duration-150
`;

const Shell = ({ children }) => {
  return (
    <div tw="my-4 max-w-6xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <header tw="text-center">
        <Link to="/">
          <PageTitle>🍿 Moviestar</PageTitle>
        </Link>

        <SearchBar />
      </header>

      <main>{children}</main>

      <footer tw="mt-8 mx-auto text-center text-gray-600">
        <p>Built for the movie fans at Lattice. 👩‍🎤</p>
      </footer>
    </div>
  );
};

export default Shell;
