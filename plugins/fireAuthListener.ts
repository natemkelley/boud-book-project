import { getModule } from "vuex-module-decorators";
import userModule from "../store/user";
import { $auth } from "../src/api/firebase";
import firebase from "firebase/app";

const extractUserInfo = (user: firebase.User) => {
  const { displayName, uid, phoneNumber, photoURL, email } = user;
  return { displayName, uid, phoneNumber, photoURL, email };
};

export default async ({ store }) => {
  return new Promise((resolve, reject) => {
    $auth.onAuthStateChanged(function(user) {
      if (user) {
        getModule(userModule, store).submitUserInfoToBeSaved(
          extractUserInfo(user)
        );
      }
      resolve(true);
    });
  });
};
