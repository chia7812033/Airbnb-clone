"use client";

import MenuOption from "./MenuOption";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const LoginMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <MenuOption onClick={() => router.push("/historys")} label={"Historys"} />
      <MenuOption onClick={() => router.push("/wishlist")} label={"Wishlist"} />
      <MenuOption onClick={() => router.push("./chats")} label={"Messages"} />
      <MenuOption
        onClick={() => {
          signOut();
          router.push("/");
        }}
        label={"Logout"}
        isBold
      />
      <hr />
      {pathname === "/host" ? (
        <MenuOption
          onClick={() => router.push("/")}
          label={"Back to user mode"}
          isBold
        />
      ) : (
        <MenuOption
          onClick={() => router.push("/host")}
          label={"Switch to host mode"}
          isBold
        />
      )}

      <MenuOption onClick={() => router.push("/profile")} label={"Profile"} />
    </>
  );
};

export default LoginMenu;
