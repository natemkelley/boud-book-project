import axios from "axios";
import queryString from "query-string";
import { ApiResultGoogleSearchList } from "./interfaces";

const GOOGLE_BOOK_API_URL = "https://www.googleapis.com/books/v1/volumes";

const createGoogleQuery = (title: string) => {
  const query = queryString.stringify({ q: title });

  return `${GOOGLE_BOOK_API_URL}?${query}`;
};

const getSingleBook = (bookId: string) => {};

const searchByISBN = () => {};

export const getBookList = async (title: string) =>
  axios
    .get(createGoogleQuery(title))
    .then(({ data }) => data as ApiResultGoogleSearchList);
