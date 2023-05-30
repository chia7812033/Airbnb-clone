import ListingCardSafe from "../listings/ListingCardSafe";
import ListingContainer from "../ui/ListingContainer";
import { Listing } from "@prisma/client";
import { useRouter } from "next/navigation";

interface UserPropertiesProps {
  properties: Listing[];
  profile?: boolean;
}

const UserProperties: React.FC<UserPropertiesProps> = ({
  properties,
  profile,
}) => {
  const router = useRouter();

  return (
    <div className='my-4'>
      <div className='flex flex-row gap-2 items-end'>
        <div className='text-2xl font-bold'>
          {profile ? " My Place" : "His/Her Place"}{" "}
        </div>
        {profile && (
          <span
            className='underline text-blue-600 cursor-pointer'
            onClick={() => router.push("/host")}
          >
            Manage my properties
          </span>
        )}
      </div>
      <div>
        {properties ? (
          <ListingContainer>
            {properties.map((property) => (
              <ListingCardSafe key={property.id} data={property} />
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
