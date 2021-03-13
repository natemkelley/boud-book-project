import firebase from "firebase/app";
import { $fireStore } from "./firebase";

//COLLECTIONS
const booksCollection = $fireStore.collection("books");

export const getBooksFromFirestore = async () => {
  const { docs } = await booksCollection.get();
  return unpackDocuments(docs);
};

// HELPERS
const unpackDocuments = (
  docs: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  >[]
) => docs.map(doc => doc.data());
