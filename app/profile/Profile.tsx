"use client";

import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import UserBody from "@/app/components/users/UserBody";
import UserProperties from "@/app/components/users/UserProperties";
import { Listing, User } from "@prisma/client";

interface ProfileProps {
  user: User;
  properties: Listing[];
}

const Profile: React.FC<ProfileProps> = ({ user, properties }) => {
  return (
    <Container>
      <Heading title='My Profile' />
      <UserBody user={user} profile />
      <UserProperties properties={properties} />
    </Container>
  );
};

export default Profile;
