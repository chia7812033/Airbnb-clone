"use client";

import ListingCard from "@/app/components/listings/ListingCard";
import ListingRow from "@/app/components/listings/ListingRow";
import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import ListingRows from "@/app/components/ui/ListingRows";
import { SafeReservation } from "@/app/types";
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
      <Heading title='My all reservations' />
      <ListingRows>
        {reservations.map((res) => (
          <div className='col-span-1 flex flex-col gap-2' key={res.id}>
            <ListingRow
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
              order
            />
          </div>
        ))}
      </ListingRows>
    </Container>
  );
};

export default Reservations;
