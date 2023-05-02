"use client";

import ListingBody from "../../components/listings/ListingBody";
import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ListingReviews from "@/app/components/listings/ListingReviews";
import { categories } from "@/app/components/navbar/Categories";
import UserBody from "@/app/components/users/UserBody";
import { SafeUser } from "@/app/types";

interface UserProps {
  user: SafeUser;
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <Container>
      <UserBody user={user} />
    </Container>
  );
};

export default User;
