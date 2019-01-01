import { UserModel } from "./user.model"
import { UserPresent } from "./user.present"

export const loginUser = async (req, res, next) => {
  // const test = uP()
  try {
    const { email, password } = req.body
    // console.log(req.body)
    const userModeld = new UserModel("", email, password)
    const presentL = await new UserPresent(req.db_f).loginUser(userModeld)
    res.status(presentL.status).json(presentL)
  } catch (error) {
    // console.log(error)
    next({ message: `Email is not in system.`, status: 500 })
  }
  // console.log(presentL)
  // presentL.then(d => console.log(d)).catch(e => console.log(e))
}
export const addNewUser = (req, res, next) => {
  if (req.body) {
    const { displayName, email, password } = req.body
    const userModeld = new UserModel(displayName, email, password)

    const presentU = new UserPresent(req.db_f).userCreate(userModeld)
    presentU
      .then(data => {
        res.json({ message: `Create user is id : ${JSON.stringify(data)} ` })
      })
      .catch(err => {
        next({ message: JSON.stringify(err), status: 500 })
      })
  } else {
    next({ message: "Not body.", status: 500 })
  }
}
