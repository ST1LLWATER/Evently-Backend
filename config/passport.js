const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

const customFields = {
  usernameField: "rollNo",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {};

const strategy = new LocalStrategy();
