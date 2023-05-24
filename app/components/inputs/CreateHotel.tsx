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

  enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onNext = () => {
    setStep((step) => step + 1);
  };

  const onBack = () => {
    setStep((step) => step - 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step != STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("api/listings", data)
      .then((res) => {
        toast.success("Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        router.push(`/listings/${res.data.id}`);
      })
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step, STEPS.PRICE]);

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

  let body = <></>;

  if (step === STEPS.CATEGORY) {
    body = (
      <div>
        <Heading title={"Which is the best to describe your place?"} />
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
  }

  if (step === STEPS.LOCATION) {
    body = (
      <div>
        <Heading title={"Where is your place?"} />
        <CountrySelect
          value={location}
          onChange={(location) => {
            setCustomValue("location", location);
          }}
        />
        <Map position={location} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <div>
        <Heading title={"Share some info about your place"} />
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
  }

  if (step === STEPS.IMAGES) {
    body = (
      <div>
        <Heading title={"Upload some photos about your place!"} />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className='mt-2'>
        <Heading title={"How would you describe your place?"} />
        <Input
          id='title'
          label='title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
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
  }

  if (step === STEPS.PRICE) {
    body = (
      <div>
        <Heading title={"Last, set a price"} />
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
  }

  return (
    <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto'>
      <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
        <div className='h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
          <div className='relative px-6 py-2 flex-auto'>{body}</div>
          <div className='flex flex-col gap-2 px-6 py-2'>
            <div className='flex items-center gap-4 w-full'>
              <CustomButton
                outline
                disabled={isLoading}
                label={"Back"}
                onClick={step === STEPS.CATEGORY ? () => {} : onBack}
                wFull
              />
              <CustomButton
                disabled={isLoading}
                label={actionLabel}
                onClick={handleSubmit(onSubmit)}
                wFull
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHotel;
