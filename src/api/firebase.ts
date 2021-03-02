import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
});

const $fireStore = firebase.firestore();

const unpackDocuments = (
  docs: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  >[]
) => docs.map(doc => doc.data());

export const test = async () => {
  const { docs } = await $fireStore.collection("books").get();
  return unpackDocuments(docs);
};
