import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "../Landing";
import HomePage from "../Home";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => (
  <Router>
    <div>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
    </div>
  </Router>
);

export default withAuthentication(App);
