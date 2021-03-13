import firebase from "firebase/app";
import { $auth } from "./firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export const createSignInUI = (element: HTMLElement) => {
  const redirectLocation = "/";
  const ui = new firebaseui.auth.AuthUI($auth);
  ui.start(element, {
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          prompt: "select_account",
        },
      },
    ],
    // signInSuccessUrl: redirectLocation,
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        console.log(authResult);
        console.log(redirectUrl);
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        console.log("here");
      },
    },
  });
};
