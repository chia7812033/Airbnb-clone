"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
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
      <div
        className='
          py-8
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8'
      >
        {properties.map((property) => (
          <ListingCard
            key={property.id}
            data={property}
            actionId={property.id}
            actionLabel={"Edit"}
            onAction={() => {}}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Properties;
