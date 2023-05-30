"use client";

import CustomButton from "../ui/CustomButton";
import Heading from "../ui/Heading";
import CategoryInput from "./CategoryInput";
import Counter from "./Counter";
import CountrySelect from "./CountrySelect";
import ImageUpload from "./ImageUpload";
import Input from "./Input";
import { categories } from "@/app/hooks/useCategories";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const CreateHotel = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("api/listings", data)
      .then((res) => {
        toast.success("Created!");
        router.refresh();
        reset();
        router.push(`/listings/${res.data.id}`);
      })
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../ui/Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const catergory = (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 my-2'>
        {categories.map((cat) => (
          <CategoryInput
            key={cat.label}
            label={cat.label}
            icon={cat.icon}
            onClick={(category) => {
              setCustomValue("category", category);
            }}
            selected={category === cat.label}
          />
        ))}
      </div>
    </div>
  );

  const locationBlock = (
    <div>
      <CountrySelect
        value={location}
        onChange={(location) => {
          setCustomValue("location", location);
        }}
      />
      <Map position={location} />
    </div>
  );

  const info = (
    <div>
      <Counter
        title={"Guests"}
        value={guestCount}
        onChange={(value) => setCustomValue("guestCount", value)}
      />
      <Counter
        title={"Rooms"}
        value={roomCount}
        onChange={(value) => setCustomValue("roomCount", value)}
      />
      <Counter
        title={"Bathrooms"}
        value={bathroomCount}
        onChange={(value) => setCustomValue("bathroomCount", value)}
      />
    </div>
  );

  const image = (
    <div>
      <ImageUpload
        value={imageSrc}
        onChange={(value) => setCustomValue("imageSrc", value)}
      />
    </div>
  );

  const title = (
    <div className='my-2'>
      <Input
        id='title'
        label='title'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='description'
        label='description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const price = (
    <div>
      <Input
        id='price'
        label='price'
        formatPrice
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <div className='flex flex-col w-full lg:w-2/3'>
      <Heading title='Create a new hotel' />
      <div className='flex flex-col'>
        {title}
        {price}
        {info}
        {locationBlock}
        {catergory}
        {image}
      </div>
      <CustomButton
        disabled={isLoading}
        label={"Create"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default CreateHotel;
