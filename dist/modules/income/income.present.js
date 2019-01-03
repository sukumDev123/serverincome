"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomePresent = void 0;

var _msg = require("../msg.class");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class IncomePresent {
  constructor(db) {
    this.db = db;
  }

  saveToNewData({
    email_user,
    data
  }) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        return _this.db.collection("incomes").doc(email_user).set({
          data: data
        });
      } catch (error) {
        return error;
      }
    })();
  }

  saveToData({
    email_user,
    type,
    detail,
    price
  }) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      try {
        const create_at = Number(new Date());
        const incomeOld = yield _this2.db.collection("incomes").doc(email_user).get(); // console.log(incomeOld)

        const dataIncome = incomeOld.data();

        if (dataIncome && dataIncome.data != undefined) {
          return _this2.db.collection("incomes").doc(email_user).set({
            data: [...dataIncome.data, {
              type,
              detail,
              price,
              create_at
            }]
          });
        } else {
          return _this2.db.collection("incomes").doc(email_user).set({
            data: [{
              type,
              detail,
              price,
              create_at
            }]
          });
        }
      } catch (error) {
        // console.log({ error })
        return error;
      }
    })();
  }

  findUserByEmail({
    email_user
  }) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      try {
        console.log(email_user);
        const getIncomeData = yield _this3.db.collection("incomes").doc(email_user).get();
        const dataIncome = getIncomeData.data();
        return new _msg.MsgHanler(`Find income by email ${email_user} is success.`, 200, dataIncome);
      } catch (error) {
        console.log(error);
        return Promise.reject(new _msg.MsgHanler(JSON.stringify(error), 500, []));
      }
    })();
  }

}

exports.IncomePresent = IncomePresent;