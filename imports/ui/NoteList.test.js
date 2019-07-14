import React from "react";
import { Meteor } from "meteor/meteor";
import { expect } from "chai";
import { mount } from "enzyme";
import { notes } from "../fixtures/fixtures";
import { NoteList } from "./NoteList";

if (Meteor.isClient) {
  describe("Note List", function() {
    it("should render note list item for each note", function() {
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find("NoteListItem").length).to.equal(2);
      expect(wrapper.find("NoteListEmptyItem").length).to.equal(0);
    });

    it("should render note list empty item if no notes", function() {
      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find("NoteListItem").length).to.equal(0);
      expect(wrapper.find("NoteListEmptyItem").length).to.not.equal(0);
    });
  });
}
