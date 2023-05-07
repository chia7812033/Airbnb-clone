import useFavorites from "../../hooks/useFavorite";
import { SafeUser } from "../../types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikeButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
  black?: boolean;
  aboslute?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  listingId,
  currentUser,
  black,
  aboslute,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className={`${
        aboslute && "absolute top-2 right-2 "
      } hover:opacity-70 transition`}
    >
      {isFavorite ? (
        <AiFillHeart size={24} className='text-rose-600' />
      ) : (
        <AiOutlineHeart
          size={24}
          className={`${black ? "text-black" : "text-white"}`}
        />
      )}
    </div>
  );
};

export default LikeButton;
