"user client";

import Container from "../Container";
import { TbBeach, TbMountain } from "react-icons/tb";
import {
  GiWindmill,
  GiModernCity,
  GiIsland,
  GiCastle,
  GiCaveEntrance,
  GiDesert,
  GiBarn,
  GiBigDiamondRing,
} from "react-icons/gi";
import { MdPool } from "react-icons/md";
import { BiWater } from "react-icons/bi";
import { FaSkiing, FaCampground } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
  },
  {
    label: "Windmill",
    icon: GiWindmill,
  },
  {
    label: "Modern",
    icon: GiModernCity,
  },
  {
    label: "CountrySide",
    icon: TbMountain,
  },
  {
    label: "Pools",
    icon: MdPool,
  },
  {
    label: "Islands",
    icon: GiIsland,
  },
  {
    label: "Lake",
    icon: BiWater,
  },
  {
    label: "Skiing",
    icon: FaSkiing,
  },
  {
    label: "Castles",
    icon: GiCastle,
  },
  {
    label: "Camping",
    icon: FaCampground,
  },
  {
    label: "Arctic",
    icon: BsSnow,
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
  },
  {
    label: "Desert",
    icon: GiDesert,
  },
  {
    label: "Barns",
    icon: GiBarn,
  },
  {
    label: "Lux",
    icon: GiBigDiamondRing,
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainpage = pathname === "/";
  if (!isMainpage) return null;

  return (
    <Container>
      <div className='flex justify-around overflow-x-auto'>
        {categories.map((cat) => (
          <CategoryBox
            key={cat.label}
            label={cat.label}
            icon={cat.icon}
            selected={category === cat.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
