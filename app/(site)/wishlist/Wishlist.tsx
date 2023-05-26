"use client";

import ListingCardSafe from "@/app/components/listings/ListingCardSafe";
import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import ListingContainer from "@/app/components/ui/ListingContainer";
import { Listing, User } from "@prisma/client";

interface WishlistProps {
  currentUser?: User | null;
  favorites: Listing[];
}

const Wishlist: React.FC<WishlistProps> = ({ currentUser, favorites }) => {
  return (
    <Container>
      <Heading title='My Wishlist' />
      <ListingContainer>
        {favorites.map((favorite) => (
          <ListingCardSafe
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </ListingContainer>
    </Container>
  );
};

export default Wishlist;
