"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgHanler = void 0;

class MsgHanler {
  constructor(msg, status, data = []) {
    this.message = msg;
    this.status = status;
    this.data = data;
  }

}

exports.MsgHanler = MsgHanler;