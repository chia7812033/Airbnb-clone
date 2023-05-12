"use client";

import ListingCard from "../components/listings/ListingCard";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import ListingContainer from "../components/ui/ListingContainer";
import { Listing, User } from "@prisma/client";

interface FavoritesProps {
  currentUser?: User | null;
  favorites: Listing[];
}

const Favorites: React.FC<FavoritesProps> = ({ currentUser, favorites }) => {
  return (
    <Container>
      <Heading
        title='Your Favorites'
        subtitle='These are what you want to stay'
      />
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
