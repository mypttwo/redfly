import React from "react";

const Search = (props) => {
  return (
    <div className="form-group">
      <input
        className="form-control bg-dark  mr-sm-2"
        type="search"
        placeholder="Search"
        value={props.search}
        onChange={props.updateSearch}
      />
    </div>
  );
};

export default Search;
