"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { AiFillPicture } from "react-icons/ai";
import Image from "next/image";
declare global {
  var cloudinary: any;
}

interface ImageCloudProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageCloudProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div className='mt-2'>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset='jq5cvqug'
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <div
              className={`
                relative
                flex
                flex-col
                rounded-lg
                p-20
                font-bold
                text-white
                cursor-pointer
                hover:opcacity-70
                transition
                border-2
                border-dashed
                items-center
                justify-center
                ${value ? "bg-gray-300" : ""}`}
              onClick={() => open?.()}
            >
              <AiFillPicture size={32} className='text-gray-400' />
              <div className='text-lg text-gray-600 my-2'>Click to upload</div>
              {value && (
                <div className='absolute inset-0'>
                  <Image
                    alt='upload'
                    src={value}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
