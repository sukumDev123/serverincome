"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerIncome = void 0;

var control = _interopRequireWildcard(require("./income.controller"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const beformInApi = (req, res, next) => {
  if (req.headers.authorization) {
    const authorization = req.headers.authorization;

    if (authorization == "sukum-lnopq") {
      next();
    } else {
      next({
        message: "not auth",
        status: 401
      });
    }
  } else {
    next({
      message: "not auth",
      status: 401
    });
  }
};

const routerIncome = router => {
  router.post("/add/new", beformInApi, control.saveIncomesList);
  router.get(`/list/:email_user`, beformInApi, control.getDataByEmail);
  router.delete("/delete/:email_user", beformInApi, control.deleteDataInArray);
  router.param("email_user", control.paramIncomeEmail);
  return router;
};

exports.routerIncome = routerIncome;