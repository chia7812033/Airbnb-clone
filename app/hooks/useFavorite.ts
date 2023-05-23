import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorites = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const isFavorite = useMemo(() => {
    const favoriteList = currentUser?.favoriteIds || [];

    return favoriteList.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        router.push("/users");
      }

      try {
        let request;

        if (isFavorite) {
          toast.success("Delete Favorite");
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          toast.success("Add Favorite");
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [currentUser, isFavorite, listingId, router]
  );

  return {
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorites;
