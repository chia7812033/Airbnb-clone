"use client";

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

interface HistorysProps {
  currentUser?: User | null;
  reservations: SafeReservation[];
}

const Historys: React.FC<HistorysProps> = ({ currentUser, reservations }) => {
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
      <Heading title='My Historys' />
      <ListingRows>
        {reservations.map((res) => (
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
          />
        ))}
      </ListingRows>
    </Container>
  );
};

export default Historys;
