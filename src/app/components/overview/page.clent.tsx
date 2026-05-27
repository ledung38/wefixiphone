"use client";
import React from "react";
import { LayoutGrid, Palette, Box, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { motion } from "motion/react";

export function OverviewComponent() {
  const items = [
    {
      id: 1,
      title: "LG Design System",
      desc: "Foundation tokens, typography, colors, spacing, shadow, radius",
      icon: <Palette className="size-6 opacity-70" />,
    },
    {
      id: 2,
      title: "UI Components",
      desc: "Buttons, Inputs, Cards, Alerts, Modals, reusable variants",
      icon: <Box className="size-6 opacity-70" />,
    },
    {
      id: 3,
      title: "Layouts & Templates",
      desc: "Grid system, spacing templates, responsive breakpoints",
      icon: <LayoutGrid className="size-6 opacity-70" />,
    },
    {
      id: 4,
      title: "Forms & Validation",
      desc: "Input validation, select, checkbox, radio components",
      icon: <FileText className="size-6 opacity-70" />,
    },
  ];
  const text = "Hôm nay tôi đi làm vui quá";
  const mid = Math.floor(text.length / 2);

  const leftPart = text.slice(0, mid).split("");
  const rightPart = text.slice(mid).split("");

  const letterVariants = {
    hidden: { scale: 1 },
    visible: (i) => ({
      scale: [1, 1.5, 1], // chữ nhún lớn lên rồi nhỏ lại
      transition: {
        delay: i * 0.05,
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      },
    }),
  };

  const righterVariants = {
    hidden: { scale: 1 },
    visible: (i) => ({
      originX: "right",
      scale: [1, 1.5, 1], // chữ nhún lớn lên rồi nhỏ lại
      transition: {
        delay: i * 0.05,
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="w-full p-8 space-y-12 mx-auto">
      <h1 className="text-3xl font-semibold">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="rounded-2xl border p-6 hover:shadow-xl transition">
              <CardContent className="space-y-3 p-0">
                <div>{item.icon}</div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-sm opacity-70">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className=" mt-12 max-w-4xl mx-auto space-y-6 text-foreground [&_strong]:text-primary">
        <motion.p
          initial={{ opacity: 0, x: "-200px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <strong>LG Design System</strong> cung cấp <em>foundation tokens</em>{" "}
          bao gồm màu sắc, typography, spacing, shadow và border radius, đảm bảo
          tính nhất quán trong toàn bộ giao diện.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: "-200px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <strong>UI Components</strong> gồm Buttons, Inputs, Cards, Alerts,
          Modals… được xây dựng <em>reusable</em> và <em>configurable</em>, giúp
          phát triển nhanh các trang mới.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: "-200px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <strong>Layouts & Templates</strong> hỗ trợ hệ thống{" "}
          <em>grid responsive</em>, spacing template và breakpoints, giúp các
          trang hiển thị tối ưu trên mọi thiết bị.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: "-200px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <strong>Forms & Validation</strong> được tích hợp sẵn, đảm bảo{" "}
          <em>input validation</em>, giảm lỗi người dùng và cải thiện trải
          nghiệm.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: "-200px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Hệ thống <strong>Theme & Tokens</strong> hỗ trợ{" "}
          <em>light/dark mode</em>, dễ tùy chỉnh màu sắc và style, giúp dự án
          triển khai nhanh mà vẫn đẹp và đồng bộ.
        </motion.p>
      </div>
    </div>
  );
}
