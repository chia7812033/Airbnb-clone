"use client";

interface ListingRowsProps {
  children: React.ReactNode;
}

const ListingRows: React.FC<ListingRowsProps> = ({ children }) => {
  return <div className='py-8 flex flex-col gap-8'>{children}</div>;
};

export default ListingRows;
