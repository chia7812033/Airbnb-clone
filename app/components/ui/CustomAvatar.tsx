"use client";

import { Avatar } from "@mui/material";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CustomAvatarProps {
  currentUser?: User | null;
  size?: number;
  profile?: boolean;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  currentUser,
  size = 36,
  profile,
}) => {
  const router = useRouter();
  const url = `/users/${currentUser?.id}`;

  return (
    <Avatar
      onClick={() => {
        if (!profile) {
          router.push(url);
        }
      }}
      src={currentUser?.image || ""}
      sx={{ width: size, height: size }}
    >
      {currentUser?.name[0]}
    </Avatar>
  );
};

export default CustomAvatar;
