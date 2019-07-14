import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Notes } from "../api/notes";
import PropTypes from "prop-types";

export const NoteListHeader = props => {
  return (
    <div>
      <button onClick={() => props.meteorCall("notes.insert")}>
        Create Note
      </button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
};
// This container wraps the function call in tracker autorun and anytime the data changes, the component rerenders
export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);
