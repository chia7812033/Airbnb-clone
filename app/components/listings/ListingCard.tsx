"use client";

import Button from "../ui/CustomButton";
import LikeButton from "../ui/LikeButton";
import { SafeReservation } from "@/app/types";
import Tooltip from "@mui/material/Tooltip";
import { Listing, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ListingCardProps {
  currentUser?: User | null;
  data: Listing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  edit?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  currentUser,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  edit,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      if (edit) {
        router.push(`/listings/${actionId}/edit`);
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled, edit, router]
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
    <div
      onClick={() => {
        router.push(`/listings/${data.id}`);
      }}
      className='col-span-1 cursor-pointer hover:shadow-lg transition rounded-xl pb-2 border-[0.5px] border-gray-300'
    >
      <div className='flex flex-col mb-2 gap-2'>
        <div className='aspect-square relative gap-2 rounded-t-xl overflow-hidden'>
          <Image
            fill
            src={data.imageSrc}
            alt={data.title}
            className='object-cover h-full w-full rounded-t-xl hover:scale-105 transition'
          />
          <LikeButton currentUser={currentUser} listingId={data.id} aboslute />
        </div>
        <div className='px-2'>
          <div className='font-semibold text-lg'>
            {data.title.length > 22 ? (
              <Tooltip title={data.title} arrow>
                <span>{`${data.title.slice(0, 20)}...`}</span>
              </Tooltip>
            ) : (
              data.title
            )}
          </div>
          <div className='text-gray-600'>
            {reservationDate || data.category}
          </div>
          <div className='flex gap-2'>
            <div>{`$ ${reservation ? reservation.totalPrice : price}`}</div>
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
              label={actionLabel || ""}
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
