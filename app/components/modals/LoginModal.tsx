"use client";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((calllback) => {
      setIsLoading(false);

      if (calllback?.error) {
        toast.error(calllback.error);
        return;
      }

      if (calllback?.ok) {
        toast.success("Logged in!");
        router.refresh();
        loginModal.onClose();
      }
    });
  };

  const body = (
    <div className='flex flex-col gap-4'>
      <Heading title={"Welcome back"} subtitle='Login to your account' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
    </div>
  );

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footer = (
    <div>
      <hr />
      <Button
        outline
        label={"Continue with Google"}
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
        wFull
      />
      <Button
        outline
        label={"Continue with GitHub"}
        icon={FaGithub}
        onClick={() => {
          signIn("github");
        }}
        wFull
      />
      <div
        className='
            text-neutral-500
            text-center
            mt-4
            font-light'
      >
        <div className='flex gap-2 justify-center'>
          <div>First time to airbnb?</div>
          <div
            onClick={toggle}
            className='
            text-black
              hover:underline
              hover:font-semibold
              transition
              cursor-pointer'
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={"Login"}
      actionLabel={"Continue"}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  );
};

export default LoginModal;
