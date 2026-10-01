"use client";

import NextImage, { ImageProps } from "next/image";
import React, { memo, useState } from "react";

import ImageFallback from "@/lib/assets/images/fallback.webp";

type Props = ImageProps;

const Image = ({ quality = 75, ...props }: Props) => {
  const isHttps = props.src?.toString()?.startsWith("https");
  const [imgSrc, setImgSrc] = useState(props.src);
  const [isError, setIsError] = useState(false);
  if (!isHttps) {
    return <NextImage quality={quality} {...props} />;
  }
  return (
    <NextImage
      {...props}
      src={isError ? ImageFallback.src : imgSrc || props.src}
      onError={() => {
        setImgSrc(ImageFallback.src);
        setIsError(true);
      }}
      quality={quality}
      style={{
        ...props.style,
        ...(isError ? { objectFit: "cover" } : {}),
      }}
    />
  );
};

export default memo(Image);
