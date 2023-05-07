import ListingCategory from "./ListingCategory";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { IconType } from "react-icons";

interface ListingInfoProps {
  user: SafeUser;
  category: { label: string; icon: IconType } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const Map = useMemo(
    () => dynamic(() => import("../ui/Map"), { ssr: false }),
    [location]
  );

  return (
    <div className='flex flex-col gap-4 text-md pt-6 pb-10'>
      <div className='flex justify-between pr-4 items-center'>
        <div className='text-xl'>
          Host by{" "}
          <span
            onClick={() => router.push(`/users/${user.id}`)}
            className='font-semibold hover:underline cursor-pointer'
          >
            {user.name}
          </span>
        </div>
        {category && (
          <ListingCategory label={category.label} icon={category.icon} />
        )}
      </div>
      <hr />
      <div>{description}</div>
      <hr />
      <div>
        <div>{`Allow ${guestCount} ${
          guestCount == 1 ? "person" : "people"
        }`}</div>
        <div>{`${roomCount} ${roomCount == 1 ? "room" : "rooms"}`}</div>
        <div>{`${bathroomCount} ${
          bathroomCount == 1 ? "bathroom" : "bathrooms"
        }`}</div>
      </div>
      <hr />
      <div className='w-full lg:w-3/4'>
        <Map position={location} />
      </div>
    </div>
  );
};

export default ListingInfo;
