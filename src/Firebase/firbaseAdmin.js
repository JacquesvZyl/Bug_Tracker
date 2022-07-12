import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase/auth";
var admin = require("firebase-admin");

var serviceAccount = require("../bug-tracker-1ec4b-firebase-adminsdk-abx74-a521190ecb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function deleteUser(uid) {
  try {
    await getAuth().deleteUser(uid);
  } catch (error) {
    throw new Error(error.message);
  }
}
