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
            v-for="book in books"
            :key="book.id"
            :color="book.color.color"
            dark
            class="mt-3"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="d-flex flex-column">
                <v-card-title
                  class="headline"
                  v-text="book.volumeInfo.title"
                ></v-card-title>
                <v-card-subtitle
                  v-text="book.volumeInfo.author"
                ></v-card-subtitle>
                <v-card-text class="description">
                  {{ book.volumeInfo.description }}
                </v-card-text>
              </div>

              <div class="ma-3 mr-4">
                <v-img
                  v-if="
                    book.volumeInfo.imageLinks &&
                      book.volumeInfo.imageLinks.thumbnail
                  "
                  :width="150"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  :src="book.volumeInfo.imageLinks.thumbnail"
                ></v-img>
              </div>
            </div>
            <v-card-actions class="d-flex align-center justify-space-between">
              <v-btn
                v-if="book.volumeInfo.infoLink"
                class="ml-2"
                :href="book.volumeInfo.infoLink"
                outlined
                rounded
                small
              >
                More Info
              </v-btn>
              <div>
                <v-btn
                  v-for="pill in createPills(book)"
                  :key="pill"
                  class="ml-2"
                  outlined
                  rounded
                  small
                >
                  {{ pill }}
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
import { getBookList, GoogleSearchListItem } from "api/index";
import uniqolor from "uniqolor";
import ISO6391 from "iso-639-1";

@Component
export default class AdminPage extends Vue {
  value = "";
  booksList: GoogleSearchListItem[] = [];
  singleBook: GoogleSearchListItem | null = null;
  loading = false;

  get search() {
    return debounce(this.searchList, 300);
  }

  get books() {
    return this.booksList.map(book => ({
      ...book,
      color: uniqolor(book.id, {
        saturation: [35, 75],
        lightness: 20,
        differencePoint: 30,
      }),
      volumeInfo: {
        ...book.volumeInfo,
        author: (book.volumeInfo.authors && book.volumeInfo.authors[0]) || "",
      },
    }));
  }

  createPills(book: GoogleSearchListItem) {
    const returnArray = [];

    /*
accessViewStatus:"SAMPLE"
country:"US"
embeddable:true
epub:Object
pdf:Object
publicDomain:false
quoteSharingAllowed:false
textToSpeechPermission:"ALLOWED_FOR_ACCESSIBILITY"
viewability:"PARTIAL"
webReaderLink:"http://play.go
*/

    if (book.volumeInfo.language)
      returnArray.push(ISO6391.getName(book.volumeInfo.language));
    if (book.accessInfo.country) returnArray.push(book.accessInfo.country);
    if (book.accessInfo.publicDomain) returnArray.push("Public Domain");
    if (book.volumeInfo.pageCount)
      returnArray.push(`${book.volumeInfo.pageCount} Pages`);
    if (book.volumeInfo.publishedDate)
      returnArray.push(book.volumeInfo.publishedDate);
    if (book.volumeInfo.publisher) returnArray.push(book.volumeInfo.publisher);

    return returnArray;
  }

  async searchList() {
    this.loading = true;
    this.booksList = (await getBookList(this.value)).items;
    this.loading = false;
  }

  async searchSingle() {}

  mounted() {
    this.value = "East of Eden";
    this.search();
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
</style>
