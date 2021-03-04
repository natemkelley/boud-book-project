import queryString from "query-string";
import axios from "axios";
import { ARResult } from "./interfaces";

const LOCAL_API = "http://localhost:8080";

const createArQuery = (title: string, author: string) => {
  const query = queryString.stringify({ title, author });
  return `${LOCAL_API}?${query}`;
};

export const getPoints = async (title: string, author: string) =>
  axios
    .get(createArQuery(title, author))
    .then(({ data }) => data as ARResult)
    .catch(() => {
      throw "Server is down";
    });
