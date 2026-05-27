import { cn } from "@/lib/utils/index";
import Link from "next/link";
import React from "react";

export const NavLink = ({
  className,
  isActive,
  isTextBlack,
  ...props
}: React.ComponentProps<typeof Link> & {
  isActive?: boolean;
  isTextBlack?: boolean;
}) => {
  return (
    <Link
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold text-white transition-colors duration-300 pb-1 min-w-15",
        isTextBlack && "text-black",
        // Underline animation - sophisticated modern look with more spacing
        "after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-0 after:-translate-x-1/2 after:origin-center after:bg-secondary after:transition-all after:duration-500 after:ease-out rounded-sm",
        // Hover state - smooth expand from center
        "hover:after:w-full hover:after:left-1/2 hover:after:-translate-x-1/2 hover:text-secondary/90",
        // Active state
        isActive &&
          "text-secondary/100 after:w-full after:left-1/2 after:-translate-x-1/2 after:bg-secondary",
        className,
      )}
    >
      {props.children}
    </Link>
  );
};
