"use client";

import { SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface ReviewInputProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const ReviewInput: React.FC<ReviewInputProps> = ({
  listingId,
  currentUser,
}) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/api/reviews", { listingId, userId: currentUser?.id, data })
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(function () {
        setIsLoading(false);
        router.refresh();
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={isLoading}
          className='
          w-full
          p-2.5
          text-sm
          text-gray-900
          bg-gray-50
          rounded-lg border
          border-none
          outline-none
          resize-none'
          placeholder='Leave your review...'
        />
        <input type='submit' className='hidden' />
      </form>
    </div>
  );
};

export default ReviewInput;
