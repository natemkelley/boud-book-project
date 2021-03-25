import { UserInfo } from "./interfaces";
import { $auth } from "../src/api/firebase";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { loginWithGoogle } from "../src/api/fireAuth";
import firebase from "firebase/app";

export const userModuleName = "user";

export const SAVE_USER_INFO = "SAVE_USER_INFO";

@Module({
  name: userModuleName,
  stateFactory: true,
  namespaced: true,
})
export default class BookModule extends VuexModule {
  user = {};

  @Mutation
  [SAVE_USER_INFO](user: UserInfo) {
    this.user = user;
  }

  @Action
  async googleSignIn() {
    const userInfo = await loginWithGoogle();
    this[SAVE_USER_INFO](userInfo);
    return;
  }
}
