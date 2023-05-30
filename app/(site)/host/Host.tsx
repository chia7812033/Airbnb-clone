"use client";

import ListingCardSafe from "@/app/components/listings/ListingCardSafe";
import ListingRow from "@/app/components/listings/ListingRow";
import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import ListingContainer from "@/app/components/ui/ListingContainer";
import ListingRows from "@/app/components/ui/ListingRows";
import { SafeReservation } from "@/app/types";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { User, Listing } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

interface HostProps {
  currentUser?: User | null;
  reservations: SafeReservation[];
  properties: Listing[];
}

const Host: React.FC<HostProps> = ({
  currentUser,
  reservations,
  properties,
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
      <Heading title='Host Dashboard' />
      <div className='my-4'>
        <div className='flex flex-col items-center'>
          <Image
            src='/images/Hotel.png'
            width={500}
            height={500}
            alt='Picture of the author'
            className='hover:scale-105 transition'
          />
          <div
            onClick={() => router.push("/createHotel")}
            className='text-xl hover:bg-gray-200 transition rounded-full cursor-pointer px-4 py-2'
          >
            Host my place
          </div>
        </div>
      </div>

      <Accordion>
        <AccordionSummary
          expandIcon={<MdKeyboardDoubleArrowDown size={24} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Heading title='Manage reservations' small />
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdKeyboardDoubleArrowDown size={24} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Heading title='Manage properties' small />
        </AccordionSummary>
        <AccordionDetails>
          <ListingContainer>
            {properties.map((property) => (
              <ListingCardSafe
                key={property.id}
                data={property}
                actionId={property.id}
                actionLabel={"Edit"}
                onAction={() => {}}
                currentUser={currentUser}
                edit
              />
            ))}
          </ListingContainer>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default Host;
