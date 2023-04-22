import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";

interface ListingInfoProps {
  user: SafeUser;
  category?: { label: string; icon: IconType };
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
  return <div>ListingInfo</div>;
};

export default ListingInfo;
