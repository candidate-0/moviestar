import React from "react";
import { Link } from "react-router-dom";
import "twin.macro";
import SearchBar from "./SearchBar";

const Shell = ({ children }) => {
  return (
    <div tw="my-4 max-w-6xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <header tw="text-center">
        <Link to="/">
          <h1 tw="text-5xl font-black my-4 mx-auto">🍿 Moviestar</h1>
        </Link>

        <SearchBar />
      </header>

      <main>{children}</main>

      <footer tw="mt-8 mx-auto text-center text-gray-600">
        <p>Built 🚧 for the movie 📽 fans 👩‍🎤 at Lattice 🌉</p>
      </footer>
    </div>
  );
};

export default Shell;
