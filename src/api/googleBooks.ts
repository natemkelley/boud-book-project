import axios from "axios";
import queryString from "query-string";
import { ApiResultGoogleSearchList, GoogleSearchListItem } from "./interfaces";

const GOOGLE_BOOK_API_URL = "https://www.googleapis.com/books/v1/volumes";
const GOOGLE_BOOK_LIST = (query: string) => `${GOOGLE_BOOK_API_URL}?${query}`;
const GOOGLE_BOOK_SINGLE = (id: string) => `${GOOGLE_BOOK_API_URL}/${id}`;

export const getSingleBook = async (bookId: string) => {
  return await axios
    .get(GOOGLE_BOOK_SINGLE(bookId))
    .then(({ data }) => data as GoogleSearchListItem);
};

export const getBookList = async (searchString: string, maxResults = 10) => {
  const query = queryString.stringify({ q: searchString, maxResults });
  return (await axios
    .get(GOOGLE_BOOK_LIST(query))
    .then(({ data }) => data)) as ApiResultGoogleSearchList;
};
