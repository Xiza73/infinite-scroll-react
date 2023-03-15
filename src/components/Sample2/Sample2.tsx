import { useRef, useCallback } from "react";
import { Post } from "../";
import { useInfiniteQuery } from "react-query";
import { getPostsPage } from "../../api/axios";

export interface Sample2Props {}

type Error = {
  message: string;
};

export function Sample2() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    "/posts",
    ({ pageParam = 1 }) => getPostsPage(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length ? pages.length + 1 : undefined;
      },
    }
  );

  const intObserver = useRef<IntersectionObserver>();
  const lastPostRef = useCallback(
    (post: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("Near bottom of page");
          fetchNextPage();
        }
      });

      if (post) intObserver?.current?.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "error") return <div>Error: {(error as Error)?.message}</div>;

  const content = data?.pages.map((page, i) => {
    return page.map((post, i) => {
      if (page.length === i + 1)
        return <Post key={post.id} post={post} ref={lastPostRef} />;

      return <Post key={post.id} post={post} />;
    });
  });

  return (
    <div className="sample">
      <h2 id="top" className="w-full text-center text-xl font-bold pb-4">
        &infin; Sample 2 - React query
      </h2>
      {content}
      <p className="text-center">
        {isFetchingNextPage || !data?.pages.length
          ? "Loading..."
          : "End of results"}
      </p>
      <p>
        <a href="#top">Back to top</a>
      </p>
    </div>
  );
}
