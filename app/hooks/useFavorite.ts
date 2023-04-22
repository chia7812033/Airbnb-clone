import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorites = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavorite = useMemo(() => {
    const favoriteList = currentUser?.favoriteIds || [];

    return favoriteList.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (isFavorite) {
          toast.success('Delete Favorite')
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          toast.success('Add Favorite')
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success(`Success`);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [currentUser, isFavorite, listingId, loginModal, router]
  );

  return {
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorites;
