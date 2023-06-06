"use client";

interface ContainerProps {
  children: React.ReactNode;
  darkBg?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, darkBg }) => {
  return (
    <div
      className={`max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-2 h-full ${
        darkBg && "bg-neutral-800/70"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
