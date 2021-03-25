import firebase from "firebase/app";
import { $auth, googleProvider } from "./firebase";

export const loginWithGoogle = async () => {
  const userInfo = await $auth
    .signInWithPopup(googleProvider)
    .then(result => result.additionalUserInfo.profile);
  return userInfo as firebase.User;
};

export const signOut = async () => {
  await $auth.signOut();
  return;
};
