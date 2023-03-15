import { useState, useEffect } from "react";
import { getPostsPage } from "../api/axios";
import { IPost } from "../types";

const usePosts = (page: number) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<{
    message?: string;
  }>({});
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController(); // cancel http request
    const { signal } = controller;

    getPostsPage(page, { signal })
      .then((data) => {
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setHasMore(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({
          message: error.message,
        });
      });

    return () => controller.abort();
  }, [page]);

  return { posts, isLoading, isError, error, hasMore };
};

export default usePosts;
