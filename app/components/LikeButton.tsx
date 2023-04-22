import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SafeUser } from "../types";

interface LikeButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const LikeButton: React.FC<LikeButtonProps> = ({ listingId, currentUser }) => {
  const isFavorite = true;
  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className='absolute top-2 right-2 hover:opacity-70 transition'
    >
      {isFavorite ? (
        <AiFillHeart size={32} className='text-rose-600' />
      ) : (
        <AiOutlineHeart size={32} className='text-white' />
      )}
    </div>
  );
};

export default LikeButton;
