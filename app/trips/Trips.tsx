"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingContainer from "../components/ListingContainer";
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
        .patch(`/api/reservations/${id}`)
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
      <ListingContainer>
        {reservations.map((res) => (
          <ListingCard
            key={res.id}
            data={res.listing}
            reservation={res}
            actionId={res.id}
            actionLabel={
              res.status === "Cancel" ? "Already Canceled" : "Cancel"
            }
            onAction={res.status === "Cancel" ? () => {} : onCancel}
            currentUser={currentUser}
            disabled={res.status === "Cancel"}
          />
        ))}
      </ListingContainer>
    </Container>
  );
};

export default Trips;
