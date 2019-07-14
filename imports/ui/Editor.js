import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Notes } from "../api/notes";

export class Editor extends Component {
  handleBodyChange(e) {
    this.props.call("notes.update", this.props.note._id, {
      body: e.target.value
    });
  }
  handleTitleChange(e) {
    this.props.call("notes.update", this.props.note._id, {
      title: e.target.value
    });
  }
  render() {
    // When setting up the components conditions, think of the situations that can occur
    // 3 things can happen with this condition
    // 1. A note was found and selected
    // 2. The ID was incorrect and we couldn't find a note
    // 3. No note has been selected
    if (this.props.note) {
      return (
        <div>
          <input
            type="text"
            value={this.props.note.title}
            placeholder="Note title here"
            onChange={this.handleTitleChange.bind(this)}
          />
          <textarea
            value={this.props.note.body}
            placeholder="Your note here"
            onChange={this.handleBodyChange.bind(this)}
          />
          <button>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>
          {this.props.selectedNoteId
            ? "Note not found"
            : "Pick or create a note to get started"}
        </p>
      );
    }
  }
}

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string
};

export default createContainer(() => {
  const selectedNoteId = Session.get("selectedNoteId");

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);
