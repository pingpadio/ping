import {
  AtSign,
  BellIcon,
  BookmarkIcon,
  GlobeIcon,
  MailIcon,
  PersonStandingIcon,
  SendIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getLensClient } from "~/utils/getLensClient";
import { ServerSignedIn } from "../ServerSignedIn";
import PostWizard from "../post/PostWizard";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import type { User } from "../user/User";
import { ConnectWalletButton } from "../web3/WalletButtons";
import { SearchButton } from "./Search";

export default async function Menu() {
  const { handle, profileId, user } = await getLensClient();
  const handleOrProfileId = handle ?? profileId;

  if (!profileId) {
    return (
      <span className="flex shrink text-xl p-4 w-full sm:w-max">
        <span className="flex flex-row sm:flex-col items-end gap-2 place-content-between sm:place-content-start w-full">
          <Link href="/home">
            <Button variant="ghost" size="sm_icon">
              <span className="hidden sm:flex -mt-1">pingpad</span>
              <AtSign className="sm:ml-2" size={20} />
            </Button>
          </Link>
          <ConnectWalletButton />
        </span>
      </span>
    );
  }

  return (
    <span className="flex shrink text-xl p-4 w-full sm:w-max">
      <span className="flex flex-row sm:flex-col items-end gap-2 place-content-between sm:place-content-start w-full">
        <Link href="/home">
          <Button variant="ghost" size="sm_icon">
            <span className="hidden sm:flex -mt-1">pingpad</span>
            <AtSign className="sm:ml-2" size={20} />
          </Button>
        </Link>
        <SearchButton />

        <ServerSignedIn>
          <MenuAuthed handle={handleOrProfileId} user={user} />
        </ServerSignedIn>
      </span>
    </span>
  );
}

export const MenuAuthed = ({ handle, user }: { handle: string; user: User }) => {
  return (
    <>
      <Link href={"/explore"}>
        <Button variant="ghost" size="sm_icon">
          <div className="hidden sm:flex -mt-1">explore</div>
          <GlobeIcon className="sm:ml-2" size={21} />
        </Button>
      </Link>

      {/* <Link href={"/c"} > */}
      <Button variant="ghost" size="sm_icon" disabled>
        <div className="hidden sm:flex -mt-1">communities</div>
        <UsersIcon className="sm:ml-2" size={21} />
      </Button>
      {/* </Link> */}

      <Button variant="ghost" size="sm_icon" className="flex lg:hidden" disabled>
        <div className="hidden sm:flex -mt-1">messages</div>
        <MailIcon className="sm:ml-2" size={20} />
      </Button>

      <Link href={"/notifications"} className="flex lg:hidden">
        <Button variant="ghost" size="sm_icon">
          <div className="hidden sm:flex -mt-1">notifications</div>
          <BellIcon className="sm:ml-2" size={21} />
        </Button>
      </Link>

      <Link href={"/bookmarks"} className="flex lg:hidden">
        <Button variant="ghost" size="sm_icon">
          <div className="hidden sm:flex -mt-1">bookmarks</div>
          <BookmarkIcon className="sm:ml-2" size={21} />
        </Button>
      </Link>

      <Link href="/settings">
        <Button variant="ghost" size="sm_icon">
          <div className="hidden sm:flex -mt-1">settings</div>
          <SettingsIcon className="sm:ml-2" size={20} />
        </Button>
      </Link>

      <Link href={`/u/${handle}`} className="flex lg:hidden">
        <Button variant="ghost" size="sm_icon">
          <div className="hidden sm:flex -mt-1">profile</div>
          <UserIcon className="sm:ml-2" size={21} />
        </Button>
      </Link>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-6 sm:px-12">
            <div className="hidden sm:flex font-bold text-lg -mt-1">post</div>
            {/* <SendIcon className="sm:ml-2" size={20} /> */}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-full sm:max-w-[700px]">
          <div className="pr-4">
            <PostWizard user={user} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
