"use client";

import ListingBody from "../../components/listings/ListingBody";
import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import useReservation from "@/app/hooks/useReservation";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface ListingProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: SafeReservation[];
}

const Listing: React.FC<ListingProps> = ({
  currentUser,
  listing,
  reservations = [],
}) => {
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const loginModal = useLoginModal();
  const reservationStore = useReservation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dateRange = reservationStore.dateRange;
  const totalPrice = reservationStore.totalPrice;

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved");
        reservationStore.setDateRangeInitial();
        router.push("/trips");
      })
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    reservationStore,
    listing?.id,
    router,
    currentUser,
    loginModal,
    totalPrice,
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
          />
        </div>
        <div className='flex flex-row w-full gap-4'>
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

          <div className='mr-0 w-1/3 lg:w-1/4'>
            <ListingReservation
              price={listing.price}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDate={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
