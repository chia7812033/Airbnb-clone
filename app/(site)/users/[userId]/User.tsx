"use client";

import Container from "@/app/components/ui/Container";
import UserBody from "@/app/components/users/UserBody";
import UserProperties from "@/app/components/users/UserProperties";
import { Listing, User } from "@prisma/client";

interface UserProps {
  user: User;
  properties: Listing[];
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
