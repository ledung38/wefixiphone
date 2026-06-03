"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Routes } from "@/lib/enum/routes";
import { TikTokIcon } from "@/components/icons";
import { AnimateLink } from "@/components/common/Animate";
import Image from "@/components/ui/Image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Pricing", href: Routes.PRICING },
        { label: "Book a Repair", href: Routes.BOOKING },
        { label: "Services", href: "/#services" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Screen Replacement", href: `${Routes.PRICING}?part=screen` },
        {
          label: "Battery Replacement",
          href: `${Routes.PRICING}?part=battery`,
        },
        {
          label: "Back Glass Replacement",
          href: `${Routes.PRICING}?part=back-glass`,
        },
        {
          label: "Charging Port Repair",
          href: `${Routes.PRICING}?part=charging`,
        },
        { label: "Camera Repair", href: `${Routes.PRICING}?part=camera` },
        {
          label: "Speaker & Audio Repair",
          href: `${Routes.PRICING}?part=audio`,
        },
        {
          label: "Housing Replacement",
          href: `${Routes.PRICING}?part=housing`,
        },
        // { label: "Software Repair", href: `${Routes.PRICING}?part=software` },
      ],
    },
    {
      title: "Contact Info",
      links: [
        { label: "0433 263 105", href: "tel:0433263105", icon: Phone },
        {
          label: "wefixiphone102@gmail.com",
          href: "mailto:wefixiphone102@gmail.com",
          icon: Mail,
        },
        { label: "Sydney, NSW, Australia", href: "#", icon: MapPin },
      ],
    },
  ];

  const socials = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
    },
    { icon: TikTokIcon, href: "#", label: "TikTok" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-primary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-40 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 !pb-5">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4 max-sm:justify-center">
                <Link
                  href={Routes.HOME}
                  className="flex items-center gap-2.5 flex-shrink-0 group"
                >
                  <div className="relative py-2 transition-all duration-300 group-hover:scale-110 ">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-75 transition-opacity duration-300  group-hover:opacity-0" />
                    <Image
                      src="/logo_header2.png"
                      alt="Logo"
                      priority
                      quality={100}
                      width={120}
                      height={60}
                      unoptimized
                      className="relative h-10 sm:h-15  w-auto"
                    />
                  </div>
                  {/* <span className="text-lg font-black text-white leading-none tracking-tight">
                      WeFix
                      <span className="text-primary font-extrabold">
                        iPhone
                      </span>
                    </span>
                    <span className="text-[9px] text-blue-200 font-bold tracking-widest uppercase mt-1">
                      Sydney Mobile Repair
                    </span> */}
                </Link>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Premium on-site iPhone screen and battery replacement services
                in Sydney. 20-minute repair at your home or office. 12-month
                warranty.
              </p>
              {/* Social links */}
              {/* <div className="flex gap-4  [&>a:last-child_path]:fill-primary [&>a:last-child:hover_svg_path]:fill-white">
                {socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -4 }}
                      className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white  flex items-center justify-center transition-colors"
                      title={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div> */}
            </motion.div>

            {/* Footer links */}
            {footerLinks.map((column, columnIndex) => (
              <motion.div key={columnIndex} variants={itemVariants}>
                <h3 className="font-semibold text-white mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => {
                    const Icon = link.icon;
                    return (
                      <li key={linkIndex}>
                        <AnimateLink
                          href={link.href}
                          target={
                            link.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          whileHover={{ x: 4 }}
                          className="text-slate-300 hover:text-primary transition-colors text-sm flex items-center gap-2 cursor-pointer"
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          {link.label}
                        </AnimateLink>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          />

          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400"
          >
            <p>
              © {currentYear} WeFixiPhone. All Rights Reserved. Sydney Mobile
              iPhone Repair.
            </p>
            <div className="flex gap-6">
              <motion.a
                href="#"
                whileHover={{ color: "var(--primary)" }}
                className="hover:text-primary transition-colors cursor-pointer text-slate-400"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: "var(--primary)" }}
                className="hover:text-primary transition-colors cursor-pointer text-slate-400"
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
