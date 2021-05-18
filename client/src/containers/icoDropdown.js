import React, { Component } from "react";

import Downshift from "downshift";

import { IcoFilter } from "../utils/nftFilter";

class IcoDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: this.props.icoFilter,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(selectedFilter) {
    this.setState({ selectedFilter: selectedFilter }, () =>
      this.props.updateIcoFilter(selectedFilter)
    );
  }

  render() {
    return (
      <Downshift
        onChange={this.onChange}
        selectedItem={this.state.selectedFilter}
        itemToString={(filters) => (filters ? filters.name : "")}
      >
        {({
          isOpen,
          getToggleButtonProps,
          getItemProps,
          highlightedIndex,
          selectedItem: dsSelectedItem,
        }) => (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle btn-block"
              {...getToggleButtonProps()}
            >
              {this.state.selectedFilter !== ""
                ? this.state.selectedFilter.name
                : "Display"}
            </button>

            {isOpen ? (
              <div className="downshift-dropdown ">
                {IcoFilter.filters.map((item, index) => (
                  <div
                    className="dropdown-item text-light border-secondary bg-dark"
                    {...getItemProps({ key: index, index, item })}
                    style={{
                      //   borderBottom: `1px solid #EEE`,
                      //   backgroundColor:
                      //     highlightedIndex === index ? "gray" : "white",
                      // color: highlightedIndex === index ? "black" : "gray",
                      fontWeight: dsSelectedItem === item ? "bold" : "normal",
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

export default IcoDropdown;
