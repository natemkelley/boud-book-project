import firebase from "firebase/app";
import { $auth, googleProvider } from "./firebase";

export const loginWithGoogle = async () => {
  console.log("logging in sir");
  try {
    await $auth.signInWithPopup(googleProvider);

    console.log("did it");
    return;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  await $auth.signOut();
  return;
};
