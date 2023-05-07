import ListingCard from "../listings/ListingCard";
import ListingContainer from "../ui/ListingContainer";
import { SafeListing } from "@/app/types";

interface UserPropertiesProps {
  properties: SafeListing[];
}

const UserProperties: React.FC<UserPropertiesProps> = ({ properties }) => {
  return (
    <div className='my-4'>
      <div className='text-2xl font-bold'>His/Her Place</div>
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
