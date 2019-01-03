"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDataInArray = exports.saveIncomesList = exports.getDataByEmail = exports.paramIncomeEmail = void 0;

var _income = require("./income.model");

var _income2 = require("./income.present");

var _msg = require("../msg.class");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const paramIncomeEmail =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (req, res, next, id) {
    try {
      const incomeData = yield new _income2.IncomePresent(req.db_f).findUserByEmail({
        email_user: id
      });
      req.income = incomeData;
      req.email_user = id;
      next();
    } catch (error) {
      next({
        message: error,
        status: 500
      });
    }
  });

  return function paramIncomeEmail(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.paramIncomeEmail = paramIncomeEmail;

const getDataByEmail =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    res.json(req.income);
  });

  return function getDataByEmail(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getDataByEmail = getDataByEmail;

const saveIncomesList =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      const _req$body = req.body,
            email = _req$body.email,
            type = _req$body.type,
            detail = _req$body.detail,
            price = _req$body.price;
      const newIncome = new _income.IncomeModel(email, type, detail, price);
      yield new _income2.IncomePresent(req.db_f).saveToData(newIncome);
      res.status(200).json(new _msg.MsgHanler("Add new Income , sucess.", 200, []));
    } catch (error) {
      next({
        message: error,
        status: 500
      });
    }
  });

  return function saveIncomesList(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

exports.saveIncomesList = saveIncomesList;

const deleteDataInArray =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      // console.time()
      let myOldData = req.income.data.data;
      const delete_index = req.query.delete_index;
      myOldData.splice(delete_index, 1);
      const newData = {
        email_user: req.email_user,
        data: myOldData
      };
      yield new _income2.IncomePresent(req.db_f).saveToNewData(newData);
      res.json(myOldData);
    } catch (error) {
      console.log(error);
      next({
        message: error,
        status: 500
      });
    }
  });

  return function deleteDataInArray(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteDataInArray = deleteDataInArray;