"use client";

import Button from "../ui/CustomButton";
import Tooltip from "@mui/material/Tooltip";
import { User, Listing } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { AiFillStar } from "react-icons/ai";

interface ListingCardProps {
  currentUser?: User | null;
  data: Listing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  edit?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
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
        </div>
        <div className='px-2'>
          <div className='font-semibold text-lg truncate'>
            {data.title.length > 20 ? (
              <Tooltip title={data.title} arrow>
                <span>{data.title}</span>
              </Tooltip>
            ) : (
              data.title
            )}
          </div>
          <div className='text-gray-600 flex flex-row gap-1 items-center'>
            <AiFillStar size={16} />
            {data.category}
          </div>
          <div className='flex gap-2'>
            <div>{`$ ${data.price}`}</div>
            <div className='font-light text-gray-500'>night</div>
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
