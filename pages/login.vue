<template>
  <v-container>
    <div class="d-flex align-center justify-center">
      <v-btn @click="signIntoApplication" outlined color="indigo" class="ma-2">
        <v-img
          class="mr-4"
          :width="20"
          src="https://cdn.icon-icons.com/icons2/2119/PNG/512/google_icon_131222.png"
        ></v-img>
        Sign in with Google
      </v-btn>
      <v-btn @click="signOut" outlined color="red" class="ma-2">
        Sign out
      </v-btn>
    </div>

    <v-card v-if="user" class="mt-6 mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{ user.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar size="80" color="grey">
          <v-img :src="user.photoURL"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { getModule } from "vuex-module-decorators";
import userModule, { userModuleName } from "store/user";
import { UserInfo } from "store/interfaces";

const user = namespace(userModuleName);

@Component
export default class AdminPage extends Vue {
  platformName = "Boud Book App";

  @user.State("user") user: UserInfo;

  async signIntoApplication() {
    await getModule(userModule, this.$store).googleSignIn();
  }

  async signOut() {
    await getModule(userModule, this.$store).signOut();
  }
}
</script>

<style scoped lang="scss">
.login-button {
  padding: 10px 55px;
  min-width: 250px;
  background: white;
  cursor: pointer;
  text-align: center;
}
</style>
