export class MsgHanler {
  constructor(msg, status, data = []) {
    this.message = msg
    this.status = status
    this.data = data
  }
}
