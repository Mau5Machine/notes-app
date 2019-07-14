import { Meteor } from "meteor/meteor";
import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import Enzyme, { mount, configure } from "enzyme";
import { Signup } from "./Signup";

if (Meteor.isClient) {
  describe("Signup", function() {
    it("should show error messages", function() {
      const error = "Not working";
      const wrapper = mount(<Signup createUser={() => {}} />);

      wrapper.setState({ error });
      const text = wrapper.find("p").text();
      expect(text).equal(error);

      wrapper.setState({ error: "" });
      expect(wrapper.find("p").length).equal(0);
    });

    it("should call createUser with the form data", function() {
      const email = "christian@test.test";
      const password = "password123";
      const spy = sinon.spy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref("email").value = email;
      wrapper.ref("password").value = password;

      wrapper.find("form").simulate("submit");
      expect(spy.getCalls()[0].args[0]).to.eql({ email, password });
    });

    it("should set error if short password", function() {
      const email = "christian@test.test";
      const password = "pass     ";
      const spy = sinon.spy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref("email").value = email;
      wrapper.ref("password").value = password;

      wrapper.find("form").simulate("submit");
      expect(wrapper.state("error").length).to.not.equal(0);
    });

    it("should set createUser callback errors", function() {
      const password = "password123!";
      const reason = "it failed yo!";
      const spy = sinon.spy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref("password").value = password;
      wrapper.find("form").simulate("submit");

      spy.getCalls()[0].args[1]({ reason });
      expect(wrapper.state("error")).to.equal(reason);

      spy.getCalls()[0].args[1]();
      expect(wrapper.state("error").length).to.equal(0);
    });
  });
}
