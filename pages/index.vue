<template>
  <div>
    <v-text-field
      v-model="value"
      label="Book Search"
      @keydown="search"
    ></v-text-field>

    <div class="d-flex align-center test">
      <v-card
        v-for="item in items"
        :key="item.id"
        width="344"
        :height="350"
        class="my-card"
      >
        <v-card-text>
          <div>{{ item.volumeInfo.authors }}</div>
          <p class="display-1 text--primary">
            {{ item.volumeInfo.title }}
          </p>
          <p>adjective</p>
          <div class="text--primary">
            {{ item.volumeInfo.description }}
          </div>
        </v-card-text>
        <v-card-actions>
          <code>
            {{ item.arData || "loading" }}
          </code>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getBookList } from "@/src/api/googleBooks";
import { getPoints } from "@/src/api/ar";
import debounce from "lodash/debounce";
import findIndex from "lodash/findIndex";
import cloneDeep from "lodash/cloneDeep";

@Component
export default class HomePage extends Vue {
  value = "";
  items: any = {};

  get search() {
    return debounce(this.performSearch, 1500);
  }

  async performSearch() {
    const result = await getBookList(this.value);
    this.items = result.items;

    this.items.forEach((result: any) => {
      const title = result.volumeInfo.title;
      const author =
        result.volumeInfo?.authors && result.volumeInfo?.authors[0];
      const id = result.id;

      this.getArScores(title, author, id);
    });
  }

  async getArScores(title: string, author: string, id: string) {
    console.log(title, author);
    const result = await getPoints(title, author);
    const indexOfResult = findIndex(this.items, { id });

    if (indexOfResult > -1 && result.isExactMatch) {
      const resultClone = cloneDeep(this.items);

      resultClone[indexOfResult] = {
        ...this.items[indexOfResult],
        arData: result,
      };
      console.log(resultClone[indexOfResult], id);
      this.items = resultClone;
    }
  }
}
</script>

<style scoped>
.test {
  display: flex;
  flex-wrap: wrap;
}

.my-card {
  margin: 10px;
  overflow: auto;
}
</style>
