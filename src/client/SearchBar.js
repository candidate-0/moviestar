import React from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const history = useHistory();

  const onChange = (e) => {
    history.replace(`/search?query=${e.target.value}`);
  };

  return <input onChange={onChange} />;
};

export default SearchBar;
