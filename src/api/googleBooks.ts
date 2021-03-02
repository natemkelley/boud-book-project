import axios from "axios";
import queryString from "query-string";

const GOOGLE_BOOK_API_URL = "https://www.googleapis.com/books/v1/volumes";
//https://www.googleapis.com/books/v1/volumes?q=quilting

const createGoogleQuery = (title: string) => {
  const query = queryString.stringify({ q: title });

  return `${GOOGLE_BOOK_API_URL}?${query}`;
};

const getSingleBook = (bookId: string) => {};

const searchByISBN = () => {};

export const getBookList = async (title: string) =>
  axios.get(createGoogleQuery(title)).then(({ data }) => data);
