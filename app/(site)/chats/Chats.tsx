import EmptyState from "@/app/components/ui/EmptyState";

interface ChatsProps {}

const Chats: React.FC<ChatsProps> = () => {
  return (
    <div>
      <EmptyState title='No Chat Found' subtitle='' />
    </div>
  );
};

export default Chats;
