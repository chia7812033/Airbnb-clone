import React from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  label: string;
  icon: IconType;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  label,
  icon: Icon,
}) => {
  return (
    <div className='flex gap-2'>
      <Icon size={20} />
      <div>{label}</div>
    </div>
  );
};

export default ListingCategory;
