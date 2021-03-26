import { UserInfo } from "./interfaces";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { loginWithGoogle, signOut } from "../src/api/fireAuth";
import firebase from "firebase/app";

export const userModuleName = "user";
export const SAVE_USER_INFO = "SAVE_USER_INFO";

@Module({
  name: userModuleName,
  stateFactory: true,
  namespaced: true,
})
export default class BookModule extends VuexModule {
  user: {} | firebase.User = null;

  @Mutation
  [SAVE_USER_INFO](user: UserInfo) {
    this.user = user;
  }

  @Action
  async googleSignIn() {
    return await loginWithGoogle();
  }

  @Action
  async signOut() {
    await signOut();
    this[SAVE_USER_INFO](null);
    return;
  }
}
