import { useState, useRef, useCallback } from "react";
import usePosts from "../../hooks/usePosts";
import { Post } from "../";

export interface SampleProps {}

export function Sample1() {
  const [page, setPage] = useState(1);
  const { posts, hasMore, isLoading, isError, error } = usePosts(page);

  const intObserver = useRef<IntersectionObserver>();
  const lastPostRef = useCallback(
    (post: HTMLDivElement) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Near bottom of page");
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (post) intObserver?.current?.observe(post);
    },
    [isLoading, hasMore]
  );

  if (isError) return <div>Error: {error.message}</div>;

  const content = posts.map((post, i) => {
    if (posts.length === i + 1)
      return <Post key={post.id} post={post} ref={lastPostRef} />;

    return <Post key={post.id} post={post} />;
  });

  return (
    <div className="sample">
      <h2 id="top" className="w-full text-center text-xl font-bold pb-4">
        &infin; Sample 1 - React only
      </h2>
      {content}
      <p className="text-center">
        {isLoading || !posts.length ? "Loading..." : "End of results"}
      </p>
      <p>
        <a href="#top">Back to top</a>
      </p>
    </div>
  );
}
