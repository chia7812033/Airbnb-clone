"use client";

import ListingCard from "../components/listings/ListingCard";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import ListingContainer from "../components/ui/ListingContainer";
import { SafeListing, SafeUser } from "../types";

interface FavoritesProps {
  currentUser?: SafeUser | null;
  favorites: SafeListing[];
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
