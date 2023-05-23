"use client";

import Button from "./CustomButton";
import Heading from "./Heading";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  showReset,
  title = "No exact match",
}) => {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center h-[65vh]'>
      <Heading center title={title} />
      {showReset && (
        <Button
          label='Reset filter'
          onClick={() => {
            router.push("/");
          }}
          outline
        />
      )}
    </div>
  );
};

export default EmptyState;
