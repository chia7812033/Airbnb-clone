import MenuOption from "./MenuOption";
import { useRouter } from "next/navigation";


const NotLoginMenu = () => {
  const router = useRouter();

  return (
    <>
      <MenuOption
        onClick={() => router.push("/users")}
        label={"Sign up"}
        isBold
      />
      <MenuOption onClick={() => router.push("/users")} label={"Log in"} />
    </>
  );
};

export default NotLoginMenu;
