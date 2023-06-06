"use client";

interface ListingRowsProps {
  children: React.ReactNode;
}

const ListingRows: React.FC<ListingRowsProps> = ({ children }) => {
  return <div className='my-8 flex flex-col gap-2 bg-slate-50'>{children}</div>;
};

export default ListingRows;
