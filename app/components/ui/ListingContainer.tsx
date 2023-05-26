"use client";

interface ListingContainerProps {
  children: React.ReactNode;
}

const ListingContainer: React.FC<ListingContainerProps> = ({ children }) => {
  return (
    <div className='py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
      {children}
    </div>
  );
};

export default ListingContainer;
