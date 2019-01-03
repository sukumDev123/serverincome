"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomeModel = void 0;

class IncomeModel {
  constructor(email_user, type, detail, price) {
    this.email_user = email_user;
    this.type = type;
    this.detail = detail;
    this.price = price;
  }

}

exports.IncomeModel = IncomeModel;