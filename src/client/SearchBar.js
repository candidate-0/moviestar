import React from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import debounce from "lodash.debounce";

const SearchInput = tw.input`
  block
  w-full
  py-2 px-4
  my-4
  bg-white shadow-lg rounded-lg
  border border-gray-200
`;

const debouncedSearch = debounce((history, query) => {
  history.replace(`/search?query=${query}`);
}, 300);

const SearchBar = () => {
  const history = useHistory();

  const onChange = (e) => {
    e.persist();
    debouncedSearch(history, e.target.value);
  };

  return (
    <SearchInput placeholder="🕵️‍♀️  Looking for something?" onChange={onChange} />
  );
};

export default SearchBar;
