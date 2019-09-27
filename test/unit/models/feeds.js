// force the test environment to 'test'
process.env.NODE_ENV = "test";

const app = require("../../../server");
const mongoose = require("mongoose");
const chai = require("chai");

// Model
const Feed = require("../../../routes/api/feeds/feeds.model");
const should = chai.should();

// Data
let data = {
  image: {},
  user: "542c2b97bac0595474108b48",
  category: "Art",
  views: 0,
  emoji: "542c2b97bac0595474108b48",
  comments: ["542c2b97bac0595474108b48", "542c2b97bac0595474108b48"],
  initial: true
};

describe("Testing Feeds Model", () => {
  let id;
  it("should create a new Feed Model", done => {
    let newFeed = new Feed(data);

    newFeed
      .save()
      .then((res, err) => {
        should.not.exist(err);
        should.exist(res);
        id = res._id;
        res.should.have.property("category").equal(data.category);
        res.should.have.property("emoji").equal("542c2b97bac0595474108b48");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("should delete a Feed Model", done => {
    Feed.deleteOne({ _id: id }, err => {
      should.not.exist(err);
      done();
    });
  });
});
