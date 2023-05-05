"use client";

import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import Avatar from "react-avatar";

interface CustomAvatarProps {
  currentUser?: SafeUser | null;
  size?: string;
  profile?: boolean;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  currentUser,
  size = "36",
  profile,
}) => {
  const router = useRouter();
  const url = profile ? "/profile" : `/users/${currentUser?.id}`;

  return (
    <>
      {currentUser ? (
        <>
          {currentUser.image ? (
            <Avatar
              onClick={() => router.push(url)}
              src={currentUser.image || ""}
              size={size}
              round={true}
            />
          ) : (
            <Avatar
              onClick={() => router.push(url)}
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
