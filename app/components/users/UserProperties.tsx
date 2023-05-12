import ListingCard from "../listings/ListingCard";
import ListingContainer from "../ui/ListingContainer";
import { Listing } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserPropertiesProps {
  properties: Listing[];
}

const UserProperties: React.FC<UserPropertiesProps> = ({ properties }) => {
  const router = useRouter();

  return (
    <div className='my-4'>
      <div className='flex flex-row gap-2 items-end'>
        <div className='text-2xl font-bold'>His/Her Place </div>
        <span
          className='underline text-blue-600 cursor-pointer'
          onClick={() => router.push("/properties")}
        >
          Manage my properties
        </span>
      </div>
      <div>
        {properties ? (
          <ListingContainer>
            {properties.map((property) => (
              <ListingCard key={property.id} data={property} />
            ))}
          </ListingContainer>
        ) : (
          <div className='text-lg font-semibold'>
            This User does not has any property
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProperties;
