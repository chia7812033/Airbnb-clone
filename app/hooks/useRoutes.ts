import useConversation from "./useConversation";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUser } from "react-icons/hi2";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/chat",
        icon: HiChat,
        active: pathname === "/chat" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUser,
        active: pathname === "/users",
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
