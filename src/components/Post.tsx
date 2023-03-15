import { forwardRef, LegacyRef } from "react";
import { IPost } from "../types";

export interface PostProps {
  post: IPost;
}

export const Post = forwardRef(
  ({ post }: PostProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const articleClass = "w-full bg-slate-400 p-4 rounded-md shadow-md mb-4";
    const postBody = (
      <>
        <h2 className="text-lg font-semibold uppercase mb-1">
          N° {post.id}: {post.title}
        </h2>
        <p className="italic">&quot;{post.body}&quot;</p>
      </>
    );

    const content = ref ? (
      <article ref={ref} className={articleClass}>
        {postBody}
      </article>
    ) : (
      <article className={articleClass}>{postBody}</article>
    );

    return content;
  }
);
