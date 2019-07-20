import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { browserHistory } from "react-router";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Notes } from "../api/notes";

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }
  handleRemove() {
    this.props.call("notes.remove", this.props.note._id);
    this.props.browserHistory.push("/dashboard");
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call("notes.update", this.props.note._id, {
      body
    });
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call("notes.update", this.props.note._id, {
      title
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
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
            value={this.state.title}
            placeholder="Note title here"
            onChange={this.handleTitleChange.bind(this)}
          />
          <textarea
            value={this.state.body}
            placeholder="Your note here"
            onChange={this.handleBodyChange.bind(this)}
          />
          <button onClick={this.handleRemove.bind(this)}>Delete Note</button>
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
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get("selectedNoteId");

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
