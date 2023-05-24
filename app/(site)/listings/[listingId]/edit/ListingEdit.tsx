"use client";

import CategoryInput from "@/app/components/inputs/CategoryInput";
import Counter from "@/app/components/inputs/Counter";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import Input from "@/app/components/inputs/Input";
import Container from "@/app/components/ui/Container";
import CustomButton from "@/app/components/ui/CustomButton";
import CustomDialog from "@/app/components/ui/CustomDialog";
import Heading from "@/app/components/ui/Heading";
import { categories } from "@/app/hooks/useCategories";
import useCountries from "@/app/hooks/useCountries";
import { Listing } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ListingEditProps {
  listing: Listing;
}

const ListingEdit: React.FC<ListingEditProps> = ({ listing }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = () => {
    setIsLoading(true);
    setOpen(false);

    axios
      .put("/api/listings", { id: listing.id })
      .then(() => {
        router.push("/properties");
      })
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { getByValue } = useCountries();
  const currentLocation = getByValue(listing.locationValue);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: listing.category,
      location: currentLocation,
      guestCount: listing.guestCount,
      roomCount: listing.roomCount,
      bathroomCount: listing.bathroomCount,
      imageSrc: listing.imageSrc,
      price: listing.price,
      title: listing.title,
      description: listing.description,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    data = { ...data, id: listing.id };

    axios
      .patch("/api/listings", data)
      .then(() => {
        toast.success("Listing Updated!");
        router.push(`/listings/${listing.id}`);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  return (
    <Container>
      <div className='flex flex-col gap-4'>
        <div>
          <Heading title={"1. Category"} />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-2'>
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
        <div>
          <Heading title={"2. Location"} />
          <div>
            <CountrySelect
              value={location}
              onChange={(location) => {
                setCustomValue("location", location);
              }}
            />
          </div>
        </div>
        <div>
          <Heading title={"3. Guest, Rooms, Bathrooms"} />
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
        <div>
          <Heading title={"4. Image Source"} />
          <Input
            id={"imageSrc"}
            label={"Image Src"}
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className='mt-2'>
          <Heading title={"5. Title and Description"} />
          <Input
            id='title'
            label='title'
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id='description'
            label='description'
            register={register}
            errors={errors}
            required
          />
        </div>
        <div>
          <Heading title={"6. Price"} />
          <Input
            id='price'
            label='price'
            formatPrice
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className='flex flex-row gap-4'>
          <CustomButton
            label='Update Change'
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
          <CustomButton
            label='Delete'
            onClick={handleClickOpen}
            disabled={isLoading}
            outline
          />
          <CustomDialog
            handleClose={handleClose}
            title={"This action cannnot be recovered. Continue?"}
            open={open}
            action={deleteItem}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingEdit;
