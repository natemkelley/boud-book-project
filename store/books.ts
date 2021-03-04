import Vue from "vue";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { getBookList, GoogleSearchListItem, getPoints } from "../src/api/index";
import {
  normalizeGoogleBookList,
  updateBookWithArInfo,
} from "../src/helpers/index";
import { Book } from "../src/applicationInterfaces/index";

export const bookModuleName = "books";

const SAVE_GOOGLE_BOOK_LIST = "SAVE_GOOGLE_BOOK_LIST";

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

  @Mutation
  [SAVE_GOOGLE_BOOK_LIST](books: GoogleSearchListItem[]) {
    this.books = [...books];
  }

  @Action
  async getGoogleBookList(search: string) {
    const { items } = await getBookList(search, 5);
    const normalizedData = normalizeGoogleBookList(items) as Book[];
    this.context.commit(SAVE_GOOGLE_BOOK_LIST, normalizedData);

    normalizedData.forEach(book => {
      this.getArBookData({
        title: book.title,
        author: book.authors[0] || "",
        id: book.id,
      });
    });

    return normalizedData;
  }

  @Action
  async getArBookData({ title, author, id }: BookSearch) {
    const arData = await getPoints(title, author);
    const updatedBooks = updateBookWithArInfo(this.books, arData, id);
    this.context.commit(SAVE_GOOGLE_BOOK_LIST, updatedBooks);
  }
}

//
