<template>
  <div>
    <v-row no-gutters>
      <v-col cols="4" class=" px-2 search">
        <div class="d-flex">
          <v-text-field
            v-model="value"
            label="Google Book Search List"
            :loading="loading"
            @keydown="search"
          ></v-text-field>
          <v-btn
            class="ma-3"
            :loading="loading"
            color="primary"
            @click="loader = 'loading'"
          >
            Search
          </v-btn>
        </div>
      </v-col>

      <v-col cols="8">
        <div class="mx-3">
          <v-card
            v-for="book in booksWithColors"
            :key="book.id"
            :color="book.color.color"
            dark
            class="mt-3"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="d-flex flex-column">
                <v-card-title
                  class="headline"
                  v-text="book.title"
                ></v-card-title>
                <v-card-subtitle
                  v-for="author in book.authors"
                  :key="author"
                  v-text="author"
                ></v-card-subtitle>
                <v-card-text class="description">
                  {{ book.description }}
                </v-card-text>
              </div>

              <div class="ma-3 mr-4">
                <v-img
                  v-if="book.images.thumbnail"
                  :width="150"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  :src="book.images.thumbnail"
                ></v-img>
              </div>
            </div>
            <v-card-actions class="d-flex align-center justify-space-between">
              <v-btn
                v-if="book.previewLink"
                class="ml-2 my-1"
                :href="book.previewLink"
                outlined
                rounded
                small
              >
                More Info
              </v-btn>
              <div class="pills">
                <v-btn
                  v-for="pill in createPills(book)"
                  :key="pill"
                  class="ml-2 my-1"
                  outlined
                  rounded
                  small
                >
                  {{ pill }}
                </v-btn>

                <v-btn
                  v-if="book.loadingARData"
                  class="ml-2 my-1"
                  outlined
                  rounded
                  small
                >
                  <div class="mr-1">AR DATA</div>
                  <v-progress-circular
                    :size="14"
                    :width="2"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <div class="d-flex align-center book list"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import debounce from "lodash/debounce";
import { namespace } from "vuex-class";
import ISO6391 from "iso-639-1";
import uniqolor from "uniqolor";
import { getModule } from "vuex-module-decorators";
import bookModule, { bookModuleName } from "store/books";
import { Book } from "src/applicationInterfaces";

const books = namespace(bookModuleName);

@Component
export default class AdminPage extends Vue {
  value = "";
  loading = false;
  @books.State("books") books: Book[];

  get search() {
    return debounce(this.searchList, 500);
  }

  get booksWithColors() {
    return this.books.map(book => ({
      ...book,
      color: uniqolor(book.id, {
        saturation: [35, 75],
        lightness: 20,
        differencePoint: 30,
      }),
    }));
  }

  createPills(book: Book) {
    const returnArray = [];
    if (book.language) returnArray.push(ISO6391.getName(book.language));
    if (book.countryOfOrigin) returnArray.push(book.countryOfOrigin);
    if (book.publicDomain) returnArray.push("Public Domain");
    if (book.pageCount) returnArray.push(`${book.pageCount} Pages`);
    if (book.publishYear) returnArray.push(`Published: ${book.publishYear}`);
    if (book.points) returnArray.push(`${book.points} Points`);
    if (book.level) returnArray.push(`Level ${book.level}`);

    return returnArray;
  }

  async searchList() {
    this.loading = true;
    await getModule(bookModule, this.$store).getGoogleBookList(this.value);
    this.loading = false;
  }
}
</script>

<style scoped>
.search {
  min-height: 85vh;
  border-right: 1px solid rgb(180, 180, 180);
}

.description {
  max-height: 200px;
  overflow: auto;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
</style>
