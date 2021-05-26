import React from "react";

const Search = (props) => {
  return (
    <div className="form-group">
      <div className="form-group has-search">
        <span className="fa fa-search form-control-feedback"></span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by words in the title or the description of the NFT..."
          value={props.search}
          onChange={props.updateSearch}
        />
      </div>
    </div>
  );
};

export default Search;
