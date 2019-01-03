"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewUser = exports.loginUser = void 0;

var _user = require("./user.model");

var _user2 = require("./user.present");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const loginUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    // const test = uP()
    try {
      const _req$body = req.body,
            email = _req$body.email,
            password = _req$body.password; // console.log(req.body)

      const userModeld = new _user.UserModel("", email, password);
      const presentL = yield new _user2.UserPresent(req.db_f).loginUser(userModeld);
      res.status(presentL.status).json(presentL);
    } catch (error) {
      // console.log(error)
      next({
        message: `Email is not in system.`,
        status: 500
      });
    } // console.log(presentL)
    // presentL.then(d => console.log(d)).catch(e => console.log(e))

  });

  return function loginUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.loginUser = loginUser;

const addNewUser = (req, res, next) => {
  if (req.body) {
    const _req$body2 = req.body,
          displayName = _req$body2.displayName,
          email = _req$body2.email,
          password = _req$body2.password;
    const userModeld = new _user.UserModel(displayName, email, password);
    const presentU = new _user2.UserPresent(req.db_f).userCreate(userModeld);
    presentU.then(data => {
      res.json({
        message: `Create user is id : ${JSON.stringify(data)} `
      });
    }).catch(err => {
      next({
        message: JSON.stringify(err),
        status: 500
      });
    });
  } else {
    next({
      message: "Not body.",
      status: 500
    });
  }
};

exports.addNewUser = addNewUser;