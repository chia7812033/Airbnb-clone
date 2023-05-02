import getCurrentUser from "./actions/getCurrentUser";
import getLisings from "./actions/getLisings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
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
        <div
          className='
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8'
        >
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </div>
      </Suspense>
    </Container>
  );
}
