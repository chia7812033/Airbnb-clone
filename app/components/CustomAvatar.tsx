"use client";

import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import Avatar from "react-avatar";

interface CustomAvatarProps {
  currentUser?: SafeUser | null;
  size?: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  currentUser,
  size = "36",
}) => {
  const router = useRouter();

  return (
    <>
      {currentUser ? (
        <>
          {currentUser.image ? (
            <Avatar
              onClick={() => router.push(`/users/${currentUser.id}`)}
              src={currentUser.image || ""}
              size={size}
              round={true}
            />
          ) : (
            <Avatar
              onClick={() => router.push(`/users/${currentUser.id}`)}
              name={currentUser.name || "User"}
              size={size}
              round={true}
            />
          )}
        </>
      ) : (
        <Avatar src={"/images/placeholder.jpg"} size={size} round={true} />
      )}
    </>
  );
};

export default CustomAvatar;
