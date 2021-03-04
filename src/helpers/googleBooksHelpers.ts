import { GoogleSearchListItem, ARResult } from "../api";
import { Book } from "src/applicationInterfaces/index";
import moment from "moment";
import findIndex from "lodash/findIndex";

export const normalizeGoogleBookData = (book: GoogleSearchListItem): Book => {
  const industryIdentifiers = book.volumeInfo.industryIdentifiers || [];
  const imageLinks = book.volumeInfo.imageLinks || {
    thumbnail: "https://i.imgur.com/sJ3CT4V.gif",
  };

  return {
    title: book.volumeInfo.title, //
    id: book.id, //
    authors: book.volumeInfo.authors || [], //
    countryOfOrigin: book.accessInfo.country, //
    publicDomain: book.accessInfo.publicDomain, //
    description: book.volumeInfo.description, //
    googleApiLink: book.selfLink, //
    averageRating: book.volumeInfo.averageRating, //
    ratingsCount: book.volumeInfo.ratingsCount, //
    language: book.volumeInfo.language, //
    pageCount: book.volumeInfo.pageCount, //
    previewLink: book.volumeInfo.previewLink, //
    publishYear: moment(book.volumeInfo.publishedDate).year(),
    originalPublishYear: null,
    categories: book.volumeInfo.categories || [],
    isbn: industryIdentifiers.map(item => ({
      isbn: item.identifier,
      publisher: book.volumeInfo.publisher,
    })),
    images: {
      thumbnail: imageLinks.thumbnail,
      medium: "",
      large: "",
    },
    arDataAvailable: null,
    loadingARData: true,
  };
};

export const normalizeGoogleBookList = (books: GoogleSearchListItem[]) => {
  return books.map(book => normalizeGoogleBookData(book)) as Book[];
};

export const updateBookWithArInfo = (
  books: Book[],
  arData: ARResult,
  id: string
) => {
  const indexOfResult = findIndex(books, { id });
  if (indexOfResult > -1) {
    books[indexOfResult] = {
      ...books[indexOfResult],
      arDataAvailable: arData.isExactMatch || false,
      loadingARData: false,
    };
  }

  if (arData.error) {
    console.warn(arData);
    return books;
  }

  if (indexOfResult > -1 && arData.isExactMatch) {
    books[indexOfResult] = {
      ...books[indexOfResult],
      level: arData.level,
      points: arData.points,
      isbn: [...books[indexOfResult].isbn, ...arData.isbn],
    };
  }

  console.log(arData);

  return books;
};
