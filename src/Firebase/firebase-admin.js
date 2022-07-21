const admin = require("firebase-admin");
const functions = require("firebase-functions");
import adminData from "../bug-tracker-1ec4b-firebase-adminsdk-abx74-a521190ecb.json" assert { type: "json" };

admin.initializeApp();

const firebaseConfig = {
  credential: adminData,
  projectId: "bug-tracker-1ec4b",
};

exports.deleteUser = functions.https.onRequest(async (req, res) => {
  try {
    const user = req.body.uid;
    await admin.auth().deleteUser(user);
    console.log("DELETED USER");
    res.status(200).send("Deleted User");
  } catch (error) {
    console.warn(error.message);
    res.status(500).send("Failed to delete user");
  }
});
