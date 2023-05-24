import MenuOption from "./MenuOption";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginMenu = () => {
  const router = useRouter();

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
    </>
  );
};

export default LoginMenu;
