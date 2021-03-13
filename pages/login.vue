<template>
  <v-container>
    <div ref="firebaseui"></div>
    <v-icon large color="green darken-2"> mdi-domain </v-icon>ICON
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { createSignInUI } from "api/fireAuth";
import { getBooksFromFirestore } from "api/fireStore";
@Component
export default class AdminPage extends Vue {
  platformName = "Boud Book App";

  async mounted() {
    createSignInUI(this.$refs.firebaseui as any);
  }
}
</script>
