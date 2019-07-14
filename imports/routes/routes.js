import React from "react";
import { Meteor } from "meteor/meteor";
import { Router, Route, browserHistory } from "react-router";

import Signup from "/imports/ui/Signup";
import NotFound from "/imports/ui/NotFound";
import Login from "/imports/ui/Login";
import Dashboard from "/imports/ui/Dashboard";
import { Session } from "meteor/session";

const unauthenticatedPages = ["/", "signup"];
const authenticatedPages = ["/dashboard"];

// TODO: Convert this code into new version of react router
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace("/dashboard");
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  }
};
// nextState includes info about the page that you are about to enter into
const onEnterNotePage = nextState => {
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  } else {
    Session.set("selectedNoteId", nextState.params.id);
  }
};

export const onAuthChange = isAuthenticated => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace("/dashboard");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace("/");
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route
      path="/dashboard"
      component={Dashboard}
      onEnter={onEnterPrivatePage}
    />
    <Route
      path="/dashboard/:id"
      component={Dashboard}
      onEnter={onEnterNotePage}
    />
    <Route component={NotFound} />
  </Router>
);
