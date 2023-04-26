"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
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
      <div
        className='
          py-8
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8'
      >
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Favorites;
