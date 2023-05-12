import getUsers from "../actions/getUsers";
import Container from "../components/ui/Container";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className='h-full flex flex-row'>{children}</div>
    </Container>
  );
}
