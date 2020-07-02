import React from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";

const SearchInput = tw.input`
  block
  w-full
  py-2 px-4
  my-4
  bg-white shadow-lg rounded-lg
  border border-gray-200
`;

const SearchBar = () => {
  const history = useHistory();

  const onChange = (e) => {
    history.replace(`/search?query=${e.target.value}`);
  };

  return (
    <SearchInput placeholder="🕵️‍♀️  Looking for something?" onChange={onChange} />
  );
};

export default SearchBar;
