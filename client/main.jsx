import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { routes, onAuthChange } from "/imports/routes/routes";
import { browserHistory } from "react-router";
import "../imports/startup/simple-schema-config";
import { Session } from "meteor/session";

// Checking if users log in/out and updating instantly by calling a callback
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// Watch for a change in the selected note id session value, when selectedNoteId changes, we update the URL automatically
Tracker.autorun(() => {
  // Fetch the session value
  const selectedNoteId = Session.get("selectedNoteId");

  // Check if it's defined, if it does, we want to change the URL
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup(() => {
  Session.set("selectedNoteId", undefined);
  render(routes, document.getElementById("react-app"));
});
