import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import moment from "moment";

export const Notes = new Mongo.Collection("notes");

// This is a publication for the notes in the database, in order to have access to the notes, you need to subscribe to this publication
if (Meteor.isServer) {
  Meteor.publish("notes", function() {
    return Notes.find({ userId: this.userId });
  });
}

Meteor.methods({
  "notes.insert"() {
    if (!this.userId) {
      throw new Meteor.Error("Not Authorized!");
    }

    return Notes.insert({
      title: "",
      body: "",
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  "notes.remove"(_id) {
    {
      if (!this.userId) {
        throw new Meteor.Error("Not Authorized!");
      }

      const schema = new SimpleSchema({
        _id: {
          type: String,
          min: 1
        }
      }).validate({ _id });

      Notes.remove({ _id, userId: this.userId });
    }
  },
  "notes.update"(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error("Not Authorized!");
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Notes.update(
      {
        _id,
        userId: this.userId
      },
      {
        $set: {
          updatedAt: moment().valueOf(),
          ...updates
        }
      }
    );
  }
});
