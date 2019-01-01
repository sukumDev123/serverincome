import { MsgHanler } from "../msg.class"

export class IncomePresent {
  constructor(db) {
    this.db = db
  }
  async saveToData({ email_user, type, detail, price }) {
    try {
      const create_at = +new Date()
      const incomeOld = await this.db
        .collection("incomes")
        .doc(email_user)
        .get()
      // console.log(incomeOld)
      const dataIncome = incomeOld.data()

      if (dataIncome && dataIncome.data != undefined) {
        return this.db
          .collection("incomes")
          .doc(email_user)
          .set({
            data: [
              ...dataIncome.data,
              {
                type,
                detail,
                price,
                create_at
              }
            ]
          })
      } else {
        return this.db
          .collection("incomes")
          .doc(email_user)
          .set({
            data: [
              {
                type,
                detail,
                price,
                create_at
              }
            ]
          })
      }
    } catch (error) {
      console.log({ error })
    }
  }
  async findUserByEmail({ email_user }) {
    try {
      console.log(email_user)
      const getIncomeData = await this.db
        .collection("incomes")
        .doc(email_user)
        .get()
      const dataIncome = getIncomeData.data()
      return new MsgHanler(
        `Find income by email ${email_user} is success.`,
        200,
        dataIncome
      )
    } catch (error) {
      console.log(error)
      return Promise.reject(new MsgHanler(JSON.stringify(error), 500, []))
    }
  }
}
