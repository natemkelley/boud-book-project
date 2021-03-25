import { getModule } from "vuex-module-decorators";
import userModule, { userModuleName, SAVE_USER_INFO } from "../store/user";
import { $auth } from "../src/api/firebase";
import cloneDeep from "lodash/cloneDeep";

export default ({ store }) => {
  $auth.onAuthStateChanged(function(user) {
    if (user) {
      getModule(userModule, store)[SAVE_USER_INFO](cloneDeep(user));
    }
  });
  return true;
};
