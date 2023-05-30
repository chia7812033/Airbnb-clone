import CreateHotel from "@/app/components/inputs/CreateHotel";
import Container from "@/app/components/ui/Container";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";

export const metadata = {
  title: "Create my place",
};

const page = async () => {
  return (
    <Container>
      <CreateHotel />
    </Container>
  );
};

export default page;
