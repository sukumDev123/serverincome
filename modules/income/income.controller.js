import { IncomeModel } from "./income.model"
import { IncomePresent } from "./income.present"
import { MsgHanler } from "../msg.class"

export const paramIncomeEmail = async (req, res, next, id) => {
  try {
    const incomeData = await new IncomePresent(req.db_f).findUserByEmail({
      email_user: id
    })
    req.income = incomeData
    console.log(req.income)
    next()
  } catch (error) {
    next({ message: error, status: 500 })
  }
}
export const getDataByEmail = async (req, res, next) => {
  res.json(req.income)
}
export const saveIncomesList = async (req, res, next) => {
  try {
    const { email, type, detail, price } = req.body
    const newIncome = new IncomeModel(email, type, detail, price)
    await new IncomePresent(req.db_f).saveToData(newIncome)
    res.status(200).json(new MsgHanler("Add new Income , sucess.", 200, []))
  } catch (error) {
    next({ message: error, status: 500 })
  }
}
