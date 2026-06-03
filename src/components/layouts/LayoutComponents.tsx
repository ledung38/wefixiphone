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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-5 flex gap-10">
          {children}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LayoutComponents;
