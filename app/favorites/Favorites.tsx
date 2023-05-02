"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingContainer from "../components/ListingContainer";
import ListingCard from "../components/listings/ListingCard";
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
