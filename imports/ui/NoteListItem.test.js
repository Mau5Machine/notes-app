import { Meteor } from "meteor/meteor";
import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import { notes } from "../fixtures/fixtures";
import sinon from "sinon";
import { NoteListItem } from "./NoteListItem";

if (Meteor.isClient) {
  describe("Note List Item", function() {
    let Session;

    beforeEach(() => {
      Session = {
        set: sinon.spy()
      };
    });

    it("should render title and timestamp", function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);
      expect(wrapper.find("h5").text()).to.equal(notes[0].title);
      expect(wrapper.find("p").text()).to.equal("7/13/19");
    });

    it("should set default title if no title set", function() {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);
      expect(wrapper.find("h5").text()).to.equal("Untitled Note");
    });

    it("should call set on click", function() {
      // 1. Render note list item using either note and session
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);
      // 2. Find the div in the component and simulate a click event
      wrapper.find("div").simulate("click");
      // 3. Expect Session.set to have been called with some arguments
      expect(Session.set.calledWith("selectedNoteId", notes[1]._id)).to.be.true;
    });
  });
}
