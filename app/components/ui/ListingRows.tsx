"use client";

interface ListingRowsProps {
  children: React.ReactNode;
}

const ListingRows: React.FC<ListingRowsProps> = ({ children }) => {
  return <div className='py-8 flex flex-col divide-y'>{children}</div>;
};

export default ListingRows;
