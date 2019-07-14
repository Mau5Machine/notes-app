import { Meteor } from "meteor/meteor";
import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
// When doing tests on container components with meteor react data, import the NAMED EXPORT
import { NoteListHeader } from "./NoteListHeader";

// Check if we are on the client with this meteor property
if (Meteor.isClient) {
  // Describe the block of tests for the specific component
  describe("Note List Header", function() {
    // Create the wrapper for the test and type what the test SHOULD result in
    it("should call meteor call on click", function() {
      // 1. Create a spy
      const spy = sinon.spy();
      // 2. Render the component with the spy
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);
      // 3. Simulate a button click
      wrapper.find("button").simulate("click");
      // 4. Make assertion that spy was called correctly
      // SinonJs spy methods - https://sinonjs.org/releases/v7.3.2/spies/
      expect(spy.calledWith("notes.insert")).to.be.true;
    });

    it("should set default title if no title set", function() {});
  });
}
