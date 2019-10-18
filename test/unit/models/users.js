// force the test environment to 'test'
process.env.NODE_ENV = 'test';

const app = require('../../../server');
const mongoose = require('mongoose');
const chai = require('chai');

// Model
const User = require('../../../routes/api/users/users.model');
const should = chai.should();

// Data
let userData = {
  email: 'luitelpramish7@gmail.com',
  password: 'hellopramish',
  passwrd2: 'hellopramish',
  name: 'Pramish Luitel'
};

describe('Testing Users Model', () => {
  let id;
  it('should create a new User Model', done => {
    let newUser = new User(userData);

    newUser
      .save()
      .then((res, err) => {
        should.not.exist(err);
        should.exist(res);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should delete a User Model', done => {
    User.deleteOne(email, err => {
      should.not.exist(err);
      done();
    });
  });
});
