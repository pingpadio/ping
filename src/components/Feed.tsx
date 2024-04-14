import {
  ProfileId,
  PublicationMetadataMainFocusType,
  PublicationType,
  useFeed,
  usePublications,
} from "@lens-protocol/react-web";
import ErrorPage from "./ErrorPage";
import { Post, lensItemToPost } from "./Post";
import { PostView } from "./PostView";
import { SuspensePostView } from "./SuspensePostView";


export function FeedPublic() {
  const { data, loading, error } = usePublications({
    where: {
      publicationTypes: [PublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.TextOnly, PublicationMetadataMainFocusType.Article],
      },
    },
  });

  const posts = data.map(publication => lensItemToPost(publication))
  return (

  )
}

export function FeedPrivate({ profileId }: { profileId?: ProfileId }) {
  const { data, loading, error } = useFeed({
    where: {
      for: profileId,
    },
  });

  // biome-ignore lint/suspicious/noArrayIndexKey: elements are not unique
  const suspense = [...Array(12)].map((_v, idx) => <SuspensePostView key={`suspense-${idx}`} />);

  if (loading) return suspense;

  if (error) return <ErrorPage title="Couldn't fetch posts" />;

  const feed = data.map((feedItem, idx) => {
    const post: Post = lensItemToPost(feedItem);

    if (post) {
      return <PostView key={`${post.id}-${idx}`} post={post} />;
    }
  });

  return feed;
}

function FeedInternal({ data, loading, error }: { data: Post[]; loading: boolean; error: Error | undefined }) {
  // biome-ignore lint/suspicious/noArrayIndexKey: elements are not unique
  const suspense = [...Array(12)].map((_v, idx) => <SuspensePostView key={`suspense-${idx}`} />);

  if (loading) return suspense;

  if (error) return <ErrorPage title="Couldn't fetch posts" />;

  const feed = data.map((post, idx) => {
    return <PostView key={`${post.id}-${idx}`} post={post} />;
  });

  return feed;
}
