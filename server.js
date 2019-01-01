import http from "http"
import { app } from "./lib/express"
import * as admin from "firebase-admin"
const adminC = require("./config/incomeonline-1f379-firebase-adminsdk-zc07r-c99d5d7dfe.json")
const db = admin
  .initializeApp({ credential: admin.credential.cert(adminC) })
  .firestore()
db.settings({ timestampsInSnapshots: true })
http.createServer(app(db)).listen(3000, () => console.log("Test listen  3000"))
