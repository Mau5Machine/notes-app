import { Meteor } from "meteor/meteor";
import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import NoteListItem from "./NoteListItem";

if (Meteor.isClient) {
  describe("Note List Item", function() {
    it("should render title and timestamp", function() {
      const title = "Note List";
      const updatedAt = 1563068213299;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);
      expect(wrapper.find("h5").text()).to.equal(title);
      expect(wrapper.find("p").text()).to.equal("7/13/19");
    });

    it("should set default title if no title set", function() {
      const title = "";
      const updatedAt = 1563068213299;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);
      expect(wrapper.find("h5").text()).to.equal("Untitled Note");
    });
  });
}
