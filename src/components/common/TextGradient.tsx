"use client";
import { Text } from "@/components/ui";
import { cn } from "@/lib/utils/index";
import React from "react";

export const TextGradient = ({ className, as = "h2" as any, ...props }) => {
  return (
    <Text
      className={cn(
        "bg-gradient-to-r from-[#0871eb] via-primary/80 text-center to-[#1565C0] bg-clip-text text-transparent",
        className,
      )}
      as={as}
      {...props}
    ></Text>
  );
};
