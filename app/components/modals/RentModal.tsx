"use client";

import { useState, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Map from "../Map";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";

const RentModal = () => {
  const rentModal = useRentModal();
  const { getByValue } = useCountries();

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

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
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
        <Heading
          title={"Which is the best to describe your place?"}
          subtitle={"Choose a category"}
        />
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
        <Heading
          title={"Where is your place?"}
          subtitle={"Choose one of the location"}
        />
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
        <Heading
          title={"Share some info about your place"}
          subtitle={"Tell us some appealing!"}
        />
        <Counter
          title={"Guests"}
          subtitle={"Share some info about your place"}
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title={"Rooms"}
          subtitle={"How many room do you have?"}
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title={"Bathrooms"}
          subtitle={"How many bathroom do you have?"}
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    body = <div></div>;
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title={"Host your own home"}
      actionLabel={actionLabel}
      secondaryActionLabel={"Back"}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      body={body}
    />
  );
};

export default RentModal;
