"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserPresent = void 0;

var _user = require("./user.model");

var _msg = require("../msg.class");

var bcrpty = _interopRequireWildcard(require("bcrypt"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class UserPresent {
  constructor(db) {
    this.db = db;
  }

  cryptoPassword(password) {
    const salt = bcrpty.genSaltSync(10);
    const encrpytPassword = bcrpty.hashSync(password, salt);
    return encrpytPassword;
  }

  checkPassword(password, hashData) {
    return bcrpty.compareSync(password, hashData);
  }
  /**
   *
   * @param {UserModel} userData
   */


  userCreate(userData) {
    const displayName = userData.displayName,
          email = userData.email,
          password = userData.password;
    const dbCreate = this.db.collection("users").doc(email);
    const addOnDb = dbCreate.set({
      displayName: displayName,
      email: email,
      password: this.cryptoPassword(password),
      role: 0,
      create_at: Number(new Date())
    });
    return addOnDb;
  }

  loginUser({
    email,
    password
  }) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // console.log({ email, password })
      try {
        const firebaseCall = yield _this.db.collection("users").doc(email).get();
        const data = firebaseCall.data();

        const checkPassword = _this.checkPassword(password, data.password);

        let message = ``;
        let status = 0,
            userData = {};

        if (checkPassword) {
          message = `Login is success.`;
          userData = {
            displayName: data.displayName,
            roles: data.role,
            email: data.email
          };
          status = 200;
        } else {
          message = `Login is not success. email or password is wrong.`;
          status = 404;
        }

        const dataReturn = new _msg.MsgHanler(message, status, userData); // console.log({ checkPassword })

        return dataReturn;
      } catch (error) {
        // console.log(error)
        return Promise.reject(new _msg.MsgHanler(JSON.stringify(error), 500, []));
      }
    })();
  }

}

exports.UserPresent = UserPresent;