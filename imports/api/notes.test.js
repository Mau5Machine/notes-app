import { Meteor } from "meteor/meteor";
import { assert } from "chai";
import { Notes } from "./notes";

if (Meteor.isServer) {
  describe("notes", function() {
    const noteOne = {
      _id: "testNoteId1",
      title: "Test Note",
      body: "This is the test body",
      updatedAt: 0,
      userId: "testUserId1"
    };
    const noteTwo = {
      _id: "testNoteId2",
      title: "Things to buy",
      body: "penis enlarger",
      updatedAt: 0,
      userId: "testUserId2"
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it("Should insert a new note", function() {
      const userId = "testid";
      const _id = Meteor.server.method_handlers["notes.insert"].apply({
        userId
      });
      const note = Notes.findOne({ _id, userId });
      assert.exists(note, "This note does exist");
    });

    it("Should not insert note if not authenticated", function() {
      assert.throws(() => {
        Meteor.server.method_handlers["notes.insert"]();
      });
    });

    it("Should remove note", function() {
      Meteor.server.method_handlers["notes.remove"].apply(
        {
          userId: noteOne.userId
        },
        [noteOne._id]
      );
      assert.notExists(Notes.findOne({ _id: noteOne._id }));
    });

    it("Should not remove note if not authenticated", function() {
      assert.throws(() => {
        Meteor.server.method_handlers["notes.remove"].apply({}, [noteOne._id]);
      });
    });

    it("Should not remove note if invalid ID", function() {
      assert.throws(() => {
        Meteor.server.method_handlers["notes.remove"].apply({
          userId: noteOne.userId
        });
      });
    });

    it("Should update the note", function() {
      const title = "Updated Title";
      Meteor.server.method_handlers["notes.update"].apply(
        {
          userId: noteOne.userId
        },
        [noteOne._id, { title }]
      );

      const note = Notes.findOne(noteOne._id);
      assert.isAbove(note.updatedAt, 0);
      assert.include({ ...note }, { title, body: noteOne.body });
    });

    it("should throw error if extra updates", function() {
      const title = "Updated Title";
      assert.throws(() => {
        Meteor.server.method_handlers["notes.update"].apply(
          {
            userId: noteOne.userId
          },
          [noteOne._id, { title, chicken: "chicken nuggets" }]
        );
      });
    });

    it("Should not update note if user was not creator", function() {
      const title = "Updated Title";
      Meteor.server.method_handlers["notes.update"].apply(
        {
          userId: "testid"
        },
        [noteOne._id, { title }]
      );

      const note = Notes.findOne(noteOne._id);
      assert.include({ ...note }, { ...noteOne });
    });

    it("Should not update note if not authorized", function() {
      const title = "Updated Title";
      assert.throws(() => {
        Meteor.server.method_handlers["notes.update"].apply({}, [noteOne._id]);
      });
    });

    it("Should not update note if invalid ID", function() {
      const title = "Updated Title";
      assert.throws(() => {
        Meteor.server.method_handlers["notes.update"].apply({
          userId: noteOne.userId
        });
      });
    });

    it("Should return a users notes", function() {
      const res = Meteor.server.publish_handlers.notes.apply({
        userId: noteOne.userId
      });
      const notes = res.fetch();

      assert.lengthOf(notes, 1);
      assert.deepEqual(notes[0], noteOne);
    });

    it("Should return zero notes for user that has none", function() {
      const result = Meteor.server.publish_handlers.notes.apply({
        userId: "testid"
      });
      const notes = result.fetch();

      assert.lengthOf(notes, 0);
    });
  });
}
