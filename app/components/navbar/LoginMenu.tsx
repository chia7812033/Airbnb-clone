import MenuOption from "./MenuOption";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginMenu = () => {
  const router = useRouter();

  return (
    <>
      <MenuOption onClick={() => router.push("/trips")} label={"My trips"} />
      <MenuOption
        onClick={() => router.push("/favorites")}
        label={"My favorites"}
      />
      <MenuOption
        onClick={() => router.push("./reservations")}
        label={"My reservations"}
      />
      <MenuOption onClick={() => router.push("./chats")} label={"My chats"} />
      <MenuOption
        onClick={() => {
          signOut();
          router.push("/");
        }}
        label={"Logout"}
        isBold={true}
      />
    </>
  );
};

export default LoginMenu;
