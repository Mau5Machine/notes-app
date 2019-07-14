import { Meteor } from "meteor/meteor";
import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import Enzyme, { mount, configure } from "enzyme";
import { Login } from "./Login";

if (Meteor.isClient) {
  describe("Login", function() {
    it("should show error messages", function() {
      const error = "Not working";
      const wrapper = mount(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });
      const text = wrapper.find("p").text();
      expect(text).equal(error);

      wrapper.setState({ error: "" });
      expect(wrapper.find("p").length).equal(0);
    });

    it("should call loginWithPassword with the form data", function() {
      const email = "christian@test.test";
      const password = "password123";
      const spy = sinon.spy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref("email").value = email;
      wrapper.ref("password").value = password;

      wrapper.find("form").simulate("submit");
      expect(spy.getCalls()[0].args[0]).to.eql({ email });
      expect(spy.getCalls()[0].args[1]).to.equal(password);
    });

    it("should set loginWithPassword callback errors", function() {
      const spy = sinon.spy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find("form").simulate("submit");

      spy.getCalls()[0].args[2]({});
      expect(wrapper.state("error").length).to.not.equal(0);

      spy.getCalls()[0].args[2]();
      expect(wrapper.state("error").length).to.equal(0);
    });
  });
}
