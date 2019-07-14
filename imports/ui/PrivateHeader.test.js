import { Meteor } from "meteor/meteor";
import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import Enzyme, { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { PrivateHeader } from "./PrivateHeader";

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe("PrivateHeader", function() {
    it("should set button text to logout", function() {
      const wrapper = mount(
        <PrivateHeader title="Something" handleLogout={() => {}} />
      );
      const buttonText = wrapper.find("button").text();
      expect(buttonText).equal("Logout");
    });

    it("should use title prop as h1 text", function() {
      const title = "test title";
      const wrapper = mount(
        <PrivateHeader title={title} handleLogout={() => {}} />
      );
      const titleText = wrapper.find("h1").text();
      expect(title).equal(titleText);
    });

    it("should call the function", function() {
      const spy = sinon.spy();
      spy(12, 2003);
      spy("Christian");
      expect(spy.calledWith("Christian")).to.be.true;
    });

    it("should call handle logout on click", function() {
      const spy = sinon.spy();
      const wrapper = mount(
        <PrivateHeader title="String" handleLogout={spy} />
      );

      wrapper.find("button").simulate("click");
      expect(spy.called).to.be.true;
    });
  });
}
