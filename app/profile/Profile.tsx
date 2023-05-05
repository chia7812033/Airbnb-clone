"use client";

import Heading from "../components/Heading";
import Container from "@/app/components/Container";
import UserBody from "@/app/components/users/UserBody";
import UserProperties from "@/app/components/users/UserProperties";
import { SafeListing, SafeUser } from "@/app/types";

interface ProfileProps {
  user: SafeUser;
  properties: SafeListing[];
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
