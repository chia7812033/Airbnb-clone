"use client";

import ListingCard from "../components/listings/ListingCard";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import ListingContainer from "../components/ui/ListingContainer";
import { Listing, User } from "@prisma/client";

interface PropertiesProps {
  currentUser?: User | null;
  properties: Listing[];
}

const Properties: React.FC<PropertiesProps> = ({ currentUser, properties }) => {
  return (
    <Container>
      <Heading title='My properties' subtitle='Consider to host more place?' />
      <ListingContainer>
        {properties.map((property) => (
          <ListingCard
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
