// Firebase Admin SDK configuration
var admin = require("firebase-admin");
require('dotenv').config();

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

module.exports = { admin, db };