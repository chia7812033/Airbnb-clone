"use client";

import Container from "@/app/components/Container";
import { SafeUser, SafeListing } from "@/app/types";
import { Reservation } from "@prisma/client";
import ListingBody from "../../components/listings/ListingBody";
import { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { userAgent } from "next/server";

interface ListingProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: Reservation[];
}

const Listing: React.FC<ListingProps> = ({
  currentUser,
  listing,
  reservations,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className='flex flex-col px-20'>
        <div>
          <ListingBody
            currentUser={currentUser}
            title={listing.title}
            imageSrc={listing.imageSrc}
            id={listing.id}
            locationValue={listing.locationValue}
          />
        </div>
        <div>
          <ListingInfo
            user={listing.user}
            category={category}
            roomCount={listing.roomCount}
            bathroomCount={listing.bathroomCount}
            guestCount={listing.guestCount}
            locationValue={listing.locationValue}
            description={listing.description}
          />
        </div>
      </div>
    </Container>
  );
};

export default Listing;
