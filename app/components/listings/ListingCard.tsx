"use client";

import Button from "../Button";
import LikeButton from "../LikeButton";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ListingCardProps {
  currentUser?: SafeUser | null;
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  currentUser,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div className='col-span-1 cursor-pointer hover:shadow-lg transition rounded-xl pb-2 border-[0.5px] border-gray-300'>
      <div className='flex flex-col mb-2 gap-2'>
        <div className='aspect-square relative gap-2 rounded-t-xl overflow-hidden'>
          <Image
            onClick={() => {
              router.push(`/listings/${data.id}`);
            }}
            fill
            src={data.imageSrc}
            alt={data.title}
            className='object-cover h-full w-full rounded-t-xl hover:scale-105 transition'
          />
          <LikeButton currentUser={currentUser} listingId={data.id} aboslute />
        </div>
        <div className='px-2'>
          <div className='font-semibold text-lg'>
            {location?.region},{" "}
            {location?.label
              ? location?.label.length > 15
                ? `${location?.label.slice(0, 15)}...`
                : location?.label
              : ""}
          </div>
          <div className='text-gray-600'>
            {reservationDate || data.category}
          </div>
          <div className='flex gap-2'>
            <div>{`$ ${
              reservation ? reservation.totalPrice : data.price
            }`}</div>
            {!reservation ? (
              <div className='font-light text-gray-500'>night</div>
            ) : (
              <div className='font-light text-gray-500'>{`X ${
                reservation.guestCount
              } ${reservation.guestCount != 1 ? "people" : "person"}`}</div>
            )}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
              outline={disabled}
              wFull
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
