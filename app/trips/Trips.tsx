"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

interface TripsProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}

const Trips: React.FC<TripsProps> = ({ currentUser, reservations }) => {
  const router = useRouter();
  const onCancel = useCallback(
    (id: string) => {
      axios
        .put(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Cancel successfully");
          router.refresh();
        })
        .catch((err) => toast.error(err.message));
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title='Your trips'
        subtitle='Where have you been? Where will you go?'
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
        {reservations.map((res) => (
          <ListingCard
            key={res.id}
            data={res.listing}
            reservation={res}
            actionId={res.id}
            actionLabel='Delete'
            onAction={onCancel}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Trips;
