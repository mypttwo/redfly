import Home from "./containers/home";
import Dashboard from "./admin/dashboard";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin">
            <Dashboard />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
