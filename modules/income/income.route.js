import * as control from "./income.controller"
export const routerIncome = router => {
  router.post("/add/new", control.saveIncomesList)
  router.get(`/list/:email_user`, control.getDataByEmail)
  router.param("email_user", control.paramIncomeEmail)
  return router
}