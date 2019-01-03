"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _user = require("../modules/users/user.route");

var _morgan = _interopRequireDefault(require("morgan"));

var _income = require("../modules/income/income.route");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

const bodyParser = require("body-parser");

const notFound = (req, res, next) => {
  next({
    message: "Not Found",
    status: 404
  });
};

const serverErr = (err, req, res, next) => {
  res.status(err.status || 500).json(err);
};

function headerSet(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
  next();
}

const routerHandler = app => {
  const router = express.Router();
  app.use("/api/user", (0, _user.routerUser)(router));
  app.use("/api/income", (0, _income.routerIncome)(router));
  app.use(notFound);
  app.use(serverErr);
};

const middleWare = (app, db) => {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use((0, _morgan.default)("dev")); // parse application/json

  app.use(bodyParser.json());
  app.use(headerSet);
  app.use((req, res, next) => {
    if (!req.db_f) {
      req.db_f = db;
    }

    next();
  });
};

const app = db => {
  const app = express();
  middleWare(app, db);
  routerHandler(app);
  return app;
};

exports.app = app;