import React from "react";
import { Meteor } from "meteor/meteor";
import { Router, Route, browserHistory } from "react-router";

import Signup from "/imports/ui/Signup";
import NotFound from "/imports/ui/NotFound";
import Login from "/imports/ui/Login";
import Dashboard from "/imports/ui/Dashboard";
import { Session } from "meteor/session";

// TODO: Convert this code into new version of react router
// nextState includes info about the page that you are about to enter into
const onEnterNotePage = nextState => {
  Session.set("selectedNoteId", nextState.params.id);
};
const onLeaveNotePage = () => {
  Session.set("selectedNoteId", undefined);
};
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === "unauth";
  const isAuthenticatedPage = currentPagePrivacy === "auth";

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace("/dashboard");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace("/");
  }
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = nextState => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set("currentPagePrivacy", lastRoute.privacy);
};
export const routes = (
  <Router history={browserHistory}>
    <Route
      onEnter={globalOnEnter}
      onChange={globalOnChange}
      onLeave={onLeaveNotePage}
    >
      <Route exact path="/" component={Login} privacy="unauth" />
      <Route path="/signup" component={Signup} privacy="unauth" />
      <Route privacy="auth" path="/dashboard" component={Dashboard} />
      <Route
        privacy="auth"
        path="/dashboard/:id"
        component={Dashboard}
        onEnter={onEnterNotePage}
      />
      <Route component={NotFound} />
    </Route>
  </Router>
);
