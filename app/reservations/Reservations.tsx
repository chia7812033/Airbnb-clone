"use client";

import ListingCard from "../components/listings/ListingCard";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import ListingContainer from "../components/ui/ListingContainer";
import { SafeReservation } from "../types";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

interface ReservationsProps {
  currentUser?: User | null;
  reservations: SafeReservation[];
}

const Reservations: React.FC<ReservationsProps> = ({
  currentUser,
  reservations,
}) => {
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
        title='Your all reservations'
        subtitle='These are all reservations comes from all over the world'
      />
      <ListingContainer>
        {reservations.map((res) => (
          <div className='col-span-1 flex flex-col gap-2' key={res.id}>
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
            <div
              className='text-center'
              onClick={() => router.push(`/users/${res.user.id}`)}
            >
              By{" "}
              <span className='hover:underline cursor-pointer'>
                {res.user.name}
              </span>
            </div>
          </div>
        ))}
      </ListingContainer>
    </Container>
  );
};

export default Reservations;
