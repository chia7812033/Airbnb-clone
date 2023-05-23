"use client";

import ListingBody from "@/app/components/listings/ListingBody";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ListingReviews from "@/app/components/listings/ListingReviews";
import { categories } from "@/app/hooks/useCategories";
import Container from "@/app/components/ui/Container";
import useReservation from "@/app/hooks/useReservation";
import {
  SafeReview,
} from "@/app/types";
import { Listing, Rating, User } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface ListingProps {
  currentUser?: User | null;
  listing: Listing & {
    user: User;
  };
  reviews?: SafeReview[];
  rating?: Rating;
  avgRating?: number;
}

const Listing: React.FC<ListingProps> = ({
  currentUser,
  listing,
  reviews = [],
  rating,
  avgRating = 5,
}) => {

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const reservationStore = useReservation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dateRange = reservationStore.dateRange;

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      router.push('/users')
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice: reservationStore.totalPrice,
        listingId: listing?.id,
        guestCount: reservationStore.guestCount,
      })
      .then(() => {
        toast.success("Hotel reserved");
        reservationStore.setDateRangeInitial();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setIsLoading(false);
        router.push("/historys");
      });
  }, [
    reservationStore,
    listing?.id,
    router,
    currentUser,
    dateRange,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );
      if (dateCount && listing.price) {
        reservationStore.setTotalPrice(Math.abs(dateCount * listing.price));
      } else {
        reservationStore.setTotalPrice(listing.price);
      }
    }
  }, [listing.price, dateRange]);

  return (
    <Container>
      <div className='flex flex-col'>
        <div>
          <ListingBody
            currentUser={currentUser}
            title={listing.title}
            imageSrc={listing.imageSrc}
            id={listing.id}
            locationValue={listing.locationValue}
            reviews={reviews.length}
            avgRating={avgRating}
          />
        </div>
        <div className='flex flex-col md:flex-row w-full gap-4 mb-2'>
          <div className='flex-1 w-full'>
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

          <div className='mr-0 w-full sm:w-1/3 lg:w-1/4'>
            <ListingReservation
              price={listing.price}
              onSubmit={onCreateReservation}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <ListingReviews
        listingId={listing.id}
        currentUser={currentUser}
        reviews={reviews}
        rating={rating}
      />
    </Container>
  );
};

export default Listing;
