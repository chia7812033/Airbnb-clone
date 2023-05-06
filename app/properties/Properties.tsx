"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingContainer from "../components/ListingContainer";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface PropertiesProps {
  currentUser?: SafeUser | null;
  properties: SafeListing[];
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
