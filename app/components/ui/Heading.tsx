"use client";

interface ClientProps {
  title: string;
  center?: boolean;
  small?: boolean;
}

const Heading: React.FC<ClientProps> = ({ title, center, small }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className={`${small ? "text-lg" : "text-2xl font-bold"}`}>
        {title}
      </div>
    </div>
  );
};

export default Heading;
