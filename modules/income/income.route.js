import * as control from "./income.controller"
const beformInApi = (req, res, next) => {
  if (req.headers.authorization) {
    const { authorization } = req.headers
    if (authorization == "sukum-lnopq") {
      next()
    } else {
      next({ message: "not auth", status: 401 })
    }
  } else {
    next({ message: "not auth", status: 401 })
  }
}
export const routerIncome = router => {
  router.post("/add/new", beformInApi, control.saveIncomesList)
  router.get(`/list/:email_user`, beformInApi, control.getDataByEmail)
  router.delete("/delete/:email_user", beformInApi, control.deleteDataInArray)
  router.param("email_user", control.paramIncomeEmail)
  return router
}
