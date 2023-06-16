import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { Divider } from "react-daisyui";
import { useSelector } from "react-redux";
import ErrorPage from "~/components/ErrorPage";
import Feed from "~/components/Feed";
import { PageLayout } from "~/components/Layout";
import { LikeButton, PostContent, PostInfo } from "~/components/PostView";
import PostWizard from "~/components/PostWizard";
import { ThreadLink } from "~/components/ThreadLink";
import { UserAvatar } from "~/components/UserAvatar";
import { api } from "~/utils/api";
import { getSSGHelper } from "~/utils/getSSGHelper";
import { type State } from "~/utils/store";

const PostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data, isError, error } = api.posts.getById.useQuery(id, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const currentThreadName = useSelector((state: State) => state.currentThreadName);

  if (isError) return <ErrorPage title={error.data?.code ?? "Something went wrong..."} />;
  if (!data) return <ErrorPage title={"Post not found qwq"} />;

  const post = data.post;
  const author = data.author;
  const replies = api.posts.getRepliesById.useQuery(id);

  return (
    <>
      <Head>
        <title>
          @{author?.username}: {post.content}
        </title>
      </Head>

      <PageLayout>
        <div className=" flex w-full flex-col items-center justify-center p-2">
          <div className="rounded-box flex h-fit w-full grow flex-row gap-4 border border-b-0 border-base-200 border-primary p-4">
            <UserAvatar profile={author} />
            <div className="flex max-w-lg grow flex-col">
              <PostInfo data={data} />
              <PostContent post={post} collapsed={false} />
            </div>
            <LikeButton post={post} />
          </div>

          <div className="flex w-full flex-row ">
            <Divider horizontal className="ml-8 mr-2 shrink pb-10 pt-2" />
            <div className="place-end my-1 flex grow flex-col pl-4">
              <Feed {...replies} />
              <PostWizard placeholder="reply..." />
            </div>
          </div>

          <ThreadLink threadName={currentThreadName}>
            <div className="  btn-primary btn-ghost btn border">{`< Back to ${currentThreadName}`}</div>
          </ThreadLink>
        </div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = getSSGHelper();
  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("Bad post id");

  await ssg.posts.getById.prefetch(id);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default PostPage;
