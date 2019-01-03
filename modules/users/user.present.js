import { UserModel } from "./user.model"
import { MsgHanler } from "../msg.class"
import * as bcrpty from "bcrypt"
export class UserPresent {
  constructor(db) {
    this.db = db
  }
  cryptoPassword(password) {
    const salt = bcrpty.genSaltSync(10)
    const encrpytPassword = bcrpty.hashSync(password, salt)
    return encrpytPassword
  }
  checkPassword(password, hashData) {
    return bcrpty.compareSync(password, hashData)
  }
  /**
   *
   * @param {UserModel} userData
   */
  userCreate(userData) {
    const { displayName, email, password } = userData
    const dbCreate = this.db.collection("users").doc(email)
    const addOnDb = dbCreate.set({
      displayName: displayName,
      email: email,
      password: this.cryptoPassword(password),
      role: 0,
      create_at: Number(new Date())
    })
    return addOnDb
  }
  async loginUser({ email, password }) {
    // console.log({ email, password })

    try {
      const firebaseCall = await this.db
        .collection("users")
        .doc(email)
        .get()
      const data = firebaseCall.data()
      const checkPassword = this.checkPassword(password, data.password)
      let message = ``
      let status = 0,
        userData = {}
      if (checkPassword) {
        message = `Login is success.`
        userData = {
          displayName: data.displayName,
          roles: data.role,
          email: data.email
        }
        status = 200
      } else {
        message = `Login is not success. email or password is wrong.`
        status = 404
      }
      const dataReturn = new MsgHanler(message, status, userData)
      // console.log({ checkPassword })
      return dataReturn
    } catch (error) {
      // console.log(error)
      return Promise.reject(new MsgHanler(JSON.stringify(error), 500, []))
    }
  }
}
