import React from "react";
import light from "../svg/moon-stars.svg";
import dark from "../svg/moon-stars-fill.svg";
import withAppContext from "../hocs/withAppContext";

class ToggleDark extends React.Component {
  state = {
    stylePath:
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/darkly/bootstrap.min.css",
  };

  toggleDark = () => {
    let stylePath =
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/flatly/bootstrap.min.css";

    if (this.state.stylePath.includes("flatly")) {
      stylePath =
        "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/darkly/bootstrap.min.css";
    }
    this.props.appContext.setStylePath(stylePath);
    this.setState({
      stylePath,
    });
  };

  render() {
    let darkModeJSX = (
      <>
        <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
        <div
          className="form-check form-switch mx-5 my-2"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Dark/Light mode"
        >
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            onClick={this.toggleDark}
          />
          <label
            className="form-check-label text-secondary"
            htmlFor="darkModeSwitch"
          >
            <img
              src={this.state.stylePath.includes("flatly") ? light : dark}
              alt="website"
            />
          </label>
        </div>
      </>
    );
    return darkModeJSX;
  }
}

export default withAppContext(ToggleDark);
