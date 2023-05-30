"use client";

interface ListingRowsProps {
  children: React.ReactNode;
}

const ListingRows: React.FC<ListingRowsProps> = ({ children }) => {
  return (
    <div className='my-8 flex flex-col gap-4 bg-slate-200'>{children}</div>
  );
};

export default ListingRows;
