import React from "react";
import { IcoFilter } from "../utils/nftFilter";

class NFTFilterDropdown extends React.Component {
  state = {
    selectedFilter: this.props.icoFilter,
  };

  select(selectedFilterIndex) {
    this.setState(
      { selectedFilter: IcoFilter.filters[selectedFilterIndex] },
      () => this.props.updateIcoFilter(IcoFilter.filters[selectedFilterIndex])
    );
  }

  render() {
    let optionsJSX = IcoFilter.filters.map((filter, index) => {
      return (
        <div
          className="dropdown-item opaque"
          onClick={() => this.select(index)}
          key={index}
        >
          {filter.name}
        </div>
      );
    });
    return (
      <>
        <button
          className="btn btn-secondary btn-block dropdown dropdown-toggle show opaque"
          data-bs-toggle="dropdown"
          type="button"
        >
          {this.state.selectedFilter.name}
        </button>
        <div className="dropdown-menu width-inherit mt-1" data-bs-popper="none">
          {optionsJSX}
        </div>
      </>
    );
  }
}

export default NFTFilterDropdown;
