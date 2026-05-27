"use client";
import Footer from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { Container } from "@/components/ui";
import SideBar from "@/modules/components/SideBar";
import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import PageFlip from "@/components/common/PageFlip";

const LayoutComponents = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <div className="flex gap-10 px-40 mt-20 pt-5">
        <SideBar />
        <PageFlip />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutComponents;
