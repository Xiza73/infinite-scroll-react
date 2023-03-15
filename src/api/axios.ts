import axios from "axios";
import { IPost } from "../types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPostsPage = async (
  page: number,
  options = {}
): Promise<IPost[]> => {
  await sleep(1000);
  const { data } = await api.get(`/posts?_page=${page}`, options);
  return data ?? [];
};
