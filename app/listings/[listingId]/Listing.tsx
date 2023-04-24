"use client";

import { Range } from "react-date-range";
import Container from "@/app/components/Container";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import ListingBody from "../../components/listings/ListingBody";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import ListingReservation from "@/app/components/listings/ListingReservation";

interface ListingProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: SafeReservation[];
}

const tomorrow = () => {
  let today = new Date();
  today.setDate(today.getDate() + 1);
  return today;
};

const initialDateRange = {
  startDate: new Date(Date.now()),
  endDate: tomorrow(),
  key: "selection",
};

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

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
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );
      if (dateCount && listing.price) {
        setTotalPrice(Math.abs(dateCount) * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
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
