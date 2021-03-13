import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { getBookList, GoogleSearchListItem, getPoints } from "../src/api/index";
import {
  normalizeGoogleBookList,
  updateBookWithArInfo,
} from "../src/helpers/index";
import { Book } from "../src/applicationInterfaces/index";

//move toast
import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast);

export const bookModuleName = "books";

const SAVE_GOOGLE_BOOK_LIST = "SAVE_GOOGLE_BOOK_LIST";
const SAVE_AR_REQUEST_NUMBER = "SAVE_AR_REQUEST_NUMBER";

interface BookSearch {
  title: string;
  author?: string;
  id: string;
}

@Module({
  name: bookModuleName,
  stateFactory: true,
  namespaced: true,
})
export default class BookModule extends VuexModule {
  books: GoogleSearchListItem[] = [];
  //change to an array of book.id
  numberOfArRequests = 0;
  MAX_NUMBER_OF_REQUESTS = 8;

  @Mutation
  [SAVE_GOOGLE_BOOK_LIST](books: GoogleSearchListItem[]) {
    this.books = [...books];
  }

  @Mutation
  [SAVE_AR_REQUEST_NUMBER](requests: number) {
    this.numberOfArRequests = requests;
  }

  @Action
  async getGoogleBookList(search: string) {
    const { items } = await getBookList(search);
    const normalizedData = normalizeGoogleBookList(items) as Book[];
    this.context.commit(SAVE_GOOGLE_BOOK_LIST, normalizedData);

    normalizedData.forEach(book => {
      if (this.numberOfArRequests < this.MAX_NUMBER_OF_REQUESTS) {
        this.getArBookData({
          title: book.title,
          author: book.authors[0] || "",
          id: book.id,
        });
        this.context.commit(
          SAVE_AR_REQUEST_NUMBER,
          this.numberOfArRequests + 1
        );
      } else {
        Vue.$toast.open({
          message:
            "Server is processing too many AR request. Hold off for like 45 seconds.",
          type: "error",
          duration: 5000,
        });
      }
    });

    return normalizedData;
  }

  @Action
  async getArBookData({ title, author, id }: BookSearch) {
    try {
      const arData = await getPoints(title, author);
      const updatedBooks = updateBookWithArInfo(this.books, arData, id);
      this.context.commit(SAVE_GOOGLE_BOOK_LIST, updatedBooks);
    } catch (error) {
      this.context.commit(
        SAVE_GOOGLE_BOOK_LIST,
        updateBookWithArInfo(this.books, { error }, id)
      );
    }
    this.context.commit(SAVE_AR_REQUEST_NUMBER, this.numberOfArRequests - 1);
  }
}
