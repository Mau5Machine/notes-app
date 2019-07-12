import { Meteor } from "meteor/meteor";
import React from "react";
import expect from "expect";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PrivateHeader from "./PrivateHeader";

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe("PrivateHeader", function() {
    it("should set button text to logout", function() {
      const wrapper = mount(<PrivateHeader title="Something" />);
      const buttonText = wrapper.find("button").text();
      expect(buttonText).toEqual("Log Out");
    });

    it("should use title prop as h1 text", function() {
      const title = "test title";
      const wrapper = mount(<PrivateHeader title={title} />);
      const titleText = wrapper.find("h1").text();
      expect(title).toEqual(titleText);
    });
  });
}
