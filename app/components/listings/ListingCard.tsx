"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import LikeButton from "../LikeButton";
import Button from "../Button";

interface ListingCardProps {
  currentUser?: SafeUser | null;
  data: Listing;
  reservation?: Reservation;
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
    <div className='col-span-1 cursor-pointer'>
      <div className='flex flex-col'>
        <div className='aspect-square relative gap-2 rounded-xl overflow-hidden'>
          <Image
            onClick={() => {
              router.push(`/listings/${data.id}`);
            }}
            fill
            src={data.imageSrc}
            alt={data.title}
            className='object-cover h-full w-full hover:scale-110 transition rounded-xl'
          />
          <LikeButton currentUser={currentUser} listingId={data.id} />
        </div>
        <div className='font-semibold text-lg'>
          {location?.region},{" "}
          {location?.label
            ? location?.label.length > 20
              ? `${location?.label.slice(0, 20)}...`
              : location?.label
            : ""}
        </div>
        <div className='text-gray-600'>{reservationDate || data.category}</div>
        <div className='flex gap-2'>
          <div>{`$ ${data.price}`}</div>
          {!reservation && (
            <div className='font-light text-gray-500'>night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
