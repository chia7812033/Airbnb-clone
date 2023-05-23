"use client";

import CustomButton from "../ui/CustomButton";
import { SafeReservation } from "@/app/types";
import Tooltip from "@mui/material/Tooltip";
import { Listing, User } from "@prisma/client";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ListingRowProps {
  currentUser?: User | null;
  data: Listing;
  reservation: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  edit?: boolean;
  order?: boolean;
}

const ListingRow: React.FC<ListingRowProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  edit,
  order,
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

  const reservationDate = useMemo(() => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const reservationDays = useMemo(() => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return Math.abs(differenceInCalendarDays(start, end));
  }, [reservation]);

  return (
    <div className='cursor-pointer hover:shadow-lg transition pb-2 px-2'>
      <div className='flex my-2 gap-2 h-60'>
        <div
          onClick={() => {
            router.push(`/listings/${data.id}`);
          }}
          className='aspect-square relative rounded-xl overflow-hidden'
        >
          <Image
            fill
            src={data.imageSrc}
            alt={data.title}
            className='object-cover h-full rounded-xl hover:scale-105 transition'
          />
        </div>
        <div className='flex justify-between w-full items-center pr-4'>
          <div className='px-2 flex flex-col justify-around h-full'>
            <div className='font-semibold text-2xl truncate'>
              {data.title.length > 20 ? (
                <Tooltip title={data.title} arrow>
                  <span>{data.title}</span>
                </Tooltip>
              ) : (
                data.title
              )}
            </div>
            <div className='text-gray-600'>
              {`${reservationDate} (${reservationDays} Night)` || data.category}
            </div>
            <div className='flex gap-2'>
              <div>${data.price}</div>
              <div className='font-light text-gray-500'>{`X ${
                reservation.guestCount
              } ${reservation.guestCount != 1 ? "people" : "person"}`}</div>
            </div>
          </div>
          <div className='flex flex-col items-end h-full justify-end'>
            <div className='font-semibold text-xl'>
              Total Price: ${reservation.totalPrice}
            </div>
            <div className='flex items-center justify-end gap-4'>
              {order && (
                <div
                  className='text-center'
                  onClick={() => router.push(`/users/${reservation.user.id}`)}
                >
                  <span className='hover:underline cursor-pointer'>
                    {reservation.user.name}
                  </span>
                </div>
              )}
              {onAction && actionLabel && (
                <CustomButton
                  disabled={disabled}
                  label={actionLabel || ""}
                  onClick={handleCancel}
                  outline={disabled}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingRow;
