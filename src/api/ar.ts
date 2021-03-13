import queryString from "query-string";
import axios from "axios";
import { ARResult } from "./interfaces";

//const BOUD_BOOK_SCRUBBER = "http://localhost:8080"; //LOCAL
const BOUD_BOOK_SCRUBBER = "https://boudbookscrubber.duckdns.org";

const createArQuery = (title: string, author: string) => {
  const query = queryString.stringify({ title, author });
  return `${BOUD_BOOK_SCRUBBER}?${query}`;
};

export const getPoints = async (title: string, author: string) =>
  axios
    .get(createArQuery(title, author))
    .then(({ data }) => data as ARResult)
    .catch(() => {
      throw "Server is down";
    });
