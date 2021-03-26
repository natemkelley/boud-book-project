import firebase from "firebase/app";
import { $auth, googleProvider } from "./firebase";

export const loginWithGoogle = async () => {
  console.log("logging in sir");
  try {
    await $auth.signInWithPopup(googleProvider);
    return;
  } catch (error) {
    //
  }
};

export const signOut = async () => {
  await $auth.signOut();
  return;
};
