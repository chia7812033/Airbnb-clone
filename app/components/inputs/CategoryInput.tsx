import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  selected?: boolean;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  selected,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
            flex
            gap-2
            items-center
            rounded-lg
            border-2
            border-gray-400
            p-2
            cursor-pointer
            hover:border-black
            transition
            ${selected ? "bg-neutral-100" : ""}
            ${selected ? "border-neutral-900" : ""}
            `}
    >
      <Icon size={16} />
      <div>{label}</div>
    </div>
  );
};

export default CategoryInput;
