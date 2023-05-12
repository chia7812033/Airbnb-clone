import EmptyState from "../components/ui/EmptyState";

export const metadata = {
  title: "My Chat",
};

const page = async () => {
  return (
    <div className='hidden lg:block lg:pl-80 h-full'>
      <EmptyState title='No Chat Found' subtitle='' />
    </div>
  );
};

export default page;
