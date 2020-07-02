import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
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

// Debounce the input handler to prevent issuing a search request on every
// keystroke.
const debouncedSearch = debounce((history, query) => {
  history.push(`/search?query=${query}`);
}, 300);

const SearchBar = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search).get("query");
  const ref = useRef(null);

  const onChange = (e) => {
    debouncedSearch(history, e.target.value);
  };

  history.listen((location) => {
    // Hackish, but an easy way to unbind the search box value after navigation.
    if (ref && location.pathname !== "/search") {
      ref.current.value = "";
    }
  });

  return (
    <SearchInput
      ref={ref}
      placeholder="🕵️‍♀️  Looking for something?"
      defaultValue={query}
      onChange={onChange}
    />
  );
};

export default SearchBar;
