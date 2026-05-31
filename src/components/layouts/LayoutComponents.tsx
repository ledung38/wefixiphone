"use client";
import Footer from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import React, { PropsWithChildren } from "react";

interface LayoutComponentsProps extends PropsWithChildren {
  fullWidth?: boolean;
}

const LayoutComponents = ({
  children,
  fullWidth = false,
}: LayoutComponentsProps) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      {fullWidth ? (
        <main className="flex-1 w-full">{children}</main>
      ) : (
        <div className="flex gap-10 px-40 mt-20 pt-5">{children}</div>
      )}
      <Footer />
    </div>
  );
};

export default LayoutComponents;
