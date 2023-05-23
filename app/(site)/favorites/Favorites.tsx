"use client";

import ListingCard from "@/app/components/listings/ListingCard";
import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import ListingContainer from "@/app/components/ui/ListingContainer";
import { Listing, User } from "@prisma/client";

interface FavoritesProps {
  currentUser?: User | null;
  favorites: Listing[];
}

const Favorites: React.FC<FavoritesProps> = ({ currentUser, favorites }) => {
  return (
    <Container>
      <Heading title='My Favorites' />
      <ListingContainer>
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </ListingContainer>
    </Container>
  );
};

export default Favorites;
