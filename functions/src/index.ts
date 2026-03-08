import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth
    .user()
    .onCreate(async (user: any) => {
        const newUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            providerData: user.providerData
        }
        db.collection("users")
            .doc(user.uid)
            .set(newUser);
        // .set(JSON.parse(JSON.stringify(user)));
    });






// import { onUserCreated } from "firebase-functions/v2/auth";
// import { onUserCreated } from "firebase-functions/v2/identity"
// import { onUserCreated } from "firebase-functions/v2/auth";
// import * as admin from "firebase-admin";

// admin.initializeApp();
// const db = admin.firestore();

// export const createUserDocument = onUserCreated(async (event: any) => {
//     const user = event.data;

//     await db
//         .collection("users")
//         .doc(user.uid)
//         .set(JSON.parse(JSON.stringify(user)));
// });








// import { onUserCreated } from "firebase-functions/v2/auth";
// import * as admin from "firebase-admin";

// admin.initializeApp();
// const db = admin.firestore();

// export const createUserDocument = onUserCreated(async(event:any) => {
//     const user = event.data;

//     await db
//         .collection("users")
//         .doc(user.uid)
//         .set(JSON.parse(JSON.stringify(user)));
// });










// import * as functionsV1 from "firebase-functions/v1";
// import * as admin from "firebase-admin";
// import { onRequest } from "firebase-functions/v2/https";

// admin.initializeApp();
// const db = admin.firestore();

// // Auth trigger (v1)
// export const createUserDocument = functionsV1.auth
//     .user()
//     .onCreate(async (user) => {
//         await db.collection("users")
//             .doc(user.uid)
//             .set(JSON.parse(JSON.stringify(user)));
//     });



// export const hello = onRequest(
//     { region: "us-central1" },
//     (req, res) => {
//         res.send("Hello World!");
//     }
// );






// import * as functionsV1 from "firebase-functions/v1";
// import { onRequest } from "firebase-functions/v2/https";
// import * as admin from "firebase-admin";

// admin.initializeApp();
// const db = admin.firestore();

// // Gen 1 — Auth trigger (must stay v1)
// export const createUserDocument = functionsV1.auth
//     .user()
//     .onCreate(async (user) => {

//         await db.collection("users")
//             .doc(user.uid)
//             .set(JSON.parse(JSON.stringify(user)));
//     });

// // Gen 2 — HTTP
// export const hello = onRequest(
//     { region: "us-central1" },
//     (req, res) => {
//         res.send("Hello World!");
//     }
// )





// // import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import * as functions from "firebase-functions/v1"
// // Initialize the Firebase Admin SDK
// admin.initializeApp();

// /**
//  * Creates a user profile document in Firestore when a new user signs up.
//  */
// exports.createProfile = functions.auth.user().onCreate((user) => {
//     // Get the UID and email from the newly created user
//     const uid = user.uid;
//     const email = user.email;
//     const displayName = user.displayName;

//     // Reference the new document in the 'users' collection with the UID as the document ID
//     const userDocRef = admin.firestore().doc(`users/${uid}`);

//     // Set the initial data for the user profile
//     return userDocRef.set({
//         email: email,
//         displayName: displayName || 'New User',
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         // Add other default fields here
//     }).then(() => {
//         console.log('User profile created in Firestore for UID:', uid);
//     }).catch((error) => {
//         console.error('Error creating user profile:', error);
//     });
// });





// import { beforeUserCreated } from "firebase-functions/v2/identity";
// import * as admin from "firebase-admin";

// admin.initializeApp();
// const db = admin.firestore();

// export const createUserDocument = beforeUserCreated(async (event) => {
//     const user = event.data;
//     if (user !== undefined) {

//         await db.collection("users")
//             .doc(user.uid)
//             .set({
//                 uid: user.uid,
//                 email: user.email,
//                 displayName: user.displayName,
//                 createdAt: admin.firestore.FieldValue.serverTimestamp(),
//             });
//     }

//     return {};
// });


// functions/index.js (or .ts file)

// const { onUserCreated } = require("firebase-functions/v2/auth");
// const { initializeApp } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// initializeApp();
// const db = getFirestore();

// exports.createUserRecord = onUserCreated((event: any) => {
//     const user = event.data; // The user record
//     const uid = user.uid;
//     const email = user.email;

//     // Create a document in the 'users' collection with the user's UID as the document ID
//     return db.collection("users").doc(uid).set({
//         email: email,
//         displayName: user.displayName || 'Anonymous',
//         createdAt: event.time,
//         // Add any other initial fields
//     })
//         .then(() => {
//             console.log("Successfully created user record in Firestore for user:", uid);
//         })
//         .catch((error: any) => {
//             console.error("Error creating user record:", error);
//         });
// });





// const functions = require("firebase-functions/v1"); // Explicitly use v1
// const { initializeApp } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// initializeApp();

// exports.createUserRecord = functions.auth.user().onCreate((user: any) => {
//     const db = getFirestore();
//     return db.collection("users").doc(user.uid).set({
//         email: user.email,
//         displayName: user.displayName || 'Anonymous',
//         createdAt: new Date().toISOString(),
//     });
// });






// import * as functions from "firebase-functions/v1";
// import { initializeApp } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";

// initializeApp();

// export const createUserRecord = functions.auth.user().onCreate((user) => {
//     const db = getFirestore();
//     return db.collection("users").doc(user.uid).set({
//         email: user.email,
//         displayName: user.displayName || 'Anonymous',
//         createdAt: new Date().toISOString(),
//     });
// });









