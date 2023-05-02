"use client";

import ListingBody from "../../components/listings/ListingBody";
import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ListingReviews from "@/app/components/listings/ListingReviews";
import { categories } from "@/app/components/navbar/Categories";
import UserBody from "@/app/components/users/UserBody";
import UserProperties from "@/app/components/users/UserProperties";
import { SafeListing, SafeUser } from "@/app/types";

interface UserProps {
  user: SafeUser;
  properties: SafeListing[];
}

const User: React.FC<UserProps> = ({ user, properties }) => {
  return (
    <Container>
      <UserBody user={user} />
      <UserProperties properties={properties} />
    </Container>
  );
};

export default User;
