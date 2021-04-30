import React from "react";
import { AppContext } from "../AppContext";

const withAppContext = (Component) => {
  return function (props) {
    return (
      <AppContext.Consumer>
        {(appContext) => (
          <Component {...props} appContext={appContext}></Component>
        )}
      </AppContext.Consumer>
    );
  };
};

export default withAppContext;
