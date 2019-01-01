import * as userC from "./user.controller"
export const routerUser = router => {
  router.post("/create/new", userC.addNewUser)
  router.post("/login", userC.loginUser)
  return router
}
