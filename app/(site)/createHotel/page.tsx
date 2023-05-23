import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateHotel from "@/app/components/inputs/CreateHotel";
import Container from "@/app/components/ui/Container";
import EmptyState from "@/app/components/ui/EmptyState";

export const metadata = {
  title: "Create my place",
};

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState />;
  }

  return (
    <Container darkBg>
      <CreateHotel />
    </Container>
  );
};

export default page;
