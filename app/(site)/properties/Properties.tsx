"use client";

import ListingCardSafe from "@/app/components/listings/ListingCardSafe";
import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import ListingContainer from "@/app/components/ui/ListingContainer";
import { Listing, User } from "@prisma/client";

interface PropertiesProps {
  currentUser?: User | null;
  properties: Listing[];
}

const Properties: React.FC<PropertiesProps> = ({ currentUser, properties }) => {
  return (
    <Container>
      <Heading title='My properties' />
      <ListingContainer>
        {properties.map((property) => (
          <ListingCardSafe
            key={property.id}
            data={property}
            actionId={property.id}
            actionLabel={"Edit"}
            onAction={() => {}}
            currentUser={currentUser}
            edit
          />
        ))}
      </ListingContainer>
    </Container>
  );
};

export default Properties;
