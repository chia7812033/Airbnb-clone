"use client";

import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact match",
}) => {
  return (
    <div className='flex flex-col justify-center items-center h-[65vh]'>
      <Heading center title={title} />
    </div>
  );
};

export default EmptyState;
