"user client";

import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";
import { useCallback } from "react";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentquery = {};

    if (params) {
      currentquery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentquery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        cursor-pointer
        pt-3
        p-2
        hover:text-black
        transition
        border-b-[2px]
        ${selected ? "border-b-black" : "border-transparent"}
        ${selected ? "text-black" : "text-gray-400"}
      `}
    >
      <Icon size={24} />
      <div className='text-sm'>{label}</div>
    </div>
  );
};

export default CategoryBox;
