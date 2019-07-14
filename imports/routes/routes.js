import React from "react";
import { Meteor } from "meteor/meteor";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
import { createBrowserHistory } from "history";

import Signup from "/imports/ui/Signup";
import NotFound from "/imports/ui/NotFound";
import Login from "/imports/ui/Login";
import Dashboard from "/imports/ui/Dashboard";

const unAuthenticatedPages = ["/", "signup"];
const authenticatedPages = ["/dashboard"];

const history = createBrowserHistory();

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    history.replace("/dashboard");
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    history.replace("/");
  }
};
// nextState includes info about the page that you are about to enter into
const onEnterNotePage = ({ location }) => {
  if (!Meteor.userId()) {
    history.replace("/");
  } else {
    console.log(location);
  }
};

export const onAuthChange = isAuthenticated => {
  const pathName = history.location.pathname;
  const isUnauthenticatedPage = unAuthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace("/dashboard");
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    history.replace("/");
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} render={onEnterPublicPage} />
      <Route path="/signup" component={Signup} render={onEnterPublicPage} />
      <Route
        path="/dashboard"
        component={Dashboard}
        render={onEnterPrivatePage}
      />
      <Route
        path="/dashboard/:id"
        component={Dashboard}
        render={onEnterNotePage}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
