/**
 * As a user,
 * Given I found the home page,
 * I can see the search bar
 * so that I can click it and search for a feed
 */
let app, URL, server;
const httpServer = require("http");
const mongoose = require("mongoose");

app = require("../../server");
URL = "http://localhost:8080";
server = httpServer.createServer(app);
server.listen(8080);

const testHome = browser => {
  browser
    .url(`${URL}/home`)
    .pause(3000)
    .assert.containsText(".title", "Photobooth")
    .click(".search")
    .waitForElementVisible("input[type='text']")
    .assert.containsText(".searchlabel", "Search")
    .end();
};

module.exports = {
  after: function(browser, done) {
    done();
  },
  "@tags": ["Homepage"],
  "As a user, Given I found the home page, I can see the search bar so that I can click it and search for a feed": testHome
};
