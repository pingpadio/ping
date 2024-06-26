import {
  type CredentialsExpiredError,
  LensTransactionStatusType,
  type NotAuthenticatedError,
  PublicationReactionType,
  type Result,
} from "@lens-protocol/client";
import { type NextRequest, NextResponse } from "next/server";
import { getLensClient } from "~/utils/getLensClient";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Missing publication id" }, { status: 400 });
  }

  try {
    const { client } = await getLensClient();

    const publication = await client.publication.fetch({
      forId: id,
    });

    if (publication.__typename === "Mirror") {
      return NextResponse.json({ error: "Cannot like a share publication" }, { status: 400 });
    }

    const reactionExists = publication.operations.hasUpvoted;

    let result: Result<void, CredentialsExpiredError | NotAuthenticatedError>;
    if (reactionExists) {
      result = await client.publication.reactions.remove({
        for: id,
        reaction: PublicationReactionType.Upvote,
      });
    } else {
      result = await client.publication.reactions.add({
        for: id,
        reaction: PublicationReactionType.Upvote,
      });
    }

    if (result.isFailure()) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ result: !reactionExists }, { status: 200 });
  } catch (error) {
    console.error("Failed to follow profile: ", error.message);
    return NextResponse.json({ error: `${error.message}` }, { status: 500 });
  }
}
