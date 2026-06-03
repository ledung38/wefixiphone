"use client";

import React from "react";

import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("w-full h-full mx-auto py-4 max-w-full", {
  variants: {
    size: {
      medium: "max-w-7xl px-4 sm:px-6 lg:px-8",
      large: "max-w-7xl px-4 sm:px-6 lg:px-8",
      xl: "max-w-[1536px] px-4 sm:px-6 lg:px-8",
      "2xl": "max-w-[1700px] px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface ContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";

export default Container;
