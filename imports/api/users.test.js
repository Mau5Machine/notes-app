import { assert } from "chai";
import { validateNewUser } from "./users";
import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  describe("users", function() {
    it("Should allow valid email address", function() {
      const testUser = {
        emails: [{ address: "cmartins629@gmail.com" }]
      };
      const res = validateNewUser(testUser);
      assert.equal(res, true);
    });

    it("Should reject invalid email", function() {
      const testUser2 = {
        emails: [{ address: "chicken" }]
      };
      assert.throws(() => {
        validateNewUser(testUser2);
      }, "Email must be a valid email address");
    });
  });
}
// const add = (a, b) => {
//   if (typeof b !== "number") {
//     return a + a;
//   }
//   return a + b;
// };

// const square = x => x * x;

// describe("square", function() {
//   it("should return a square unit", function() {
//     const reslt = square(4);
//     expect(reslt).to.be(16);
//   });
// });

// describe("add", function() {
//   it("should double a single number", function() {
//     const res = add(44);
//     expect(res).to.be(88);
//   });

//   it("should add two numbers", function() {
//     const result = add(10, 25);
//     expect(result).to.be(35);
//   });
// });
