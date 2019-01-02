import http from "http"
import { app } from "./lib/express"
import configFire from "./config/incomeonline-1f379-firebase-adminsdk-zc07r-c99d5d7dfe.json"
import * as admin from "firebase-admin"
const firestore = admin
  .initializeApp({ credential: admin.credential.cert(configFire) })
  .firestore()

firestore.settings({ timestampsInSnapshots: true })
http
  .createServer(app(firestore))
  .listen(3000, () => console.log("Test listen  3000"))
