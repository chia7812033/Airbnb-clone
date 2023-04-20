"use client";

import Heading from "./Heading";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ showReset }) => {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center h-[65vh]'>
      <Heading
        center
        title='No exact match'
        subtitle='Please retry with another filter'
      />
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
