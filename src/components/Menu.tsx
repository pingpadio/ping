import {
  FiGlobe,
  FiHome,
  FiInfo,
  FiLogOut,
  FiMail,
  FiUser,
} from "react-icons/fi";
import Footer from "./Footer";
import { OtterIcon } from "./Icons";
import { MenuItem } from "./MenuItem";

export default function Menu() {
  return (
    <div className="sticky top-0 hidden h-screen w-max shrink flex-col place-content-between py-4 px-2 sm:flex">
      <div className="flex flex-col items-end gap-2">
        <div className="font-bold">
          <MenuItem href={"/"} name={"Twotter"} icon={<OtterIcon />} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <MenuItem href={"/"} name={"Home"} icon={<FiHome />} />
          <MenuItem href={"/profile"} name={"Profile"} icon={<FiUser />} />
          <MenuItem href={"/"} name={"Global"} icon={<FiGlobe />} />
          <MenuItem href={"/"} name={"Messages"} icon={<FiMail />} />
          <MenuItem href={"/"} name={"About"} icon={<FiInfo />} />
          <MenuItem href={"/"} name={"Sign out"} icon={<FiLogOut />} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
