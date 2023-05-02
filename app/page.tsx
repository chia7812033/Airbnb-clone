import getCurrentUser from "./actions/getCurrentUser";
import getLisings from "./actions/getLisings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingContainer from "./components/ListingContainer";
import ListingCard from "./components/listings/ListingCard";
import Loading from "./loading";
import { Suspense } from "react";

interface HomeProps {
  searchParams: { search: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getLisings(searchParams.search);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <ListingContainer>
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </ListingContainer>
      </Suspense>
    </Container>
  );
}
