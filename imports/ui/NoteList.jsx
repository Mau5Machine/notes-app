import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Notes } from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import PropTypes from "prop-types";

export const NoteList = props => {
  return (
    <div>
      <NoteListHeader />
      {props.notes.map(note => (
        <NoteListItem key={note._id} note={note} />
      ))}
      Note List {props.notes.length}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};
export default createContainer(() => {
  // This subscribes me to the notes publication and I am allowed to fetch data from the notes in the db now
  Meteor.subscribe("notes");

  return {
    // Returning all notes this usr has access too, fetch takes the cursor and returns an array
    notes: Notes.find().fetch()
  };
}, NoteList);
