"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

class UserModel {
  constructor(displayName, email, password, roles = 0) {
    this.displayName = displayName;
    this.email = email;
    this.password = password;
    this.roles;
  }

}

exports.UserModel = UserModel;