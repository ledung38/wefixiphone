"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { NextAvatar } from "@/components/ui";
import { Routes } from "@/lib/enum/routes";
import logo from "@/lib/assets/images/logo.webp";
import { TikTokIcon } from "@/components/icons";
import { AnimateLink } from "@/components/common/Animate";

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
        { label: "About Us", href: Routes.ABOUT_US },
        { label: "Services", href: "/#services" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        {
          label: "End of Lease Cleaning",
          href: Routes.SERVICE_END_OF_LEASE_CLEANING,
        },
        { label: "Regular Cleaning", href: Routes.SERVICE_REGULAR_CLEANING },
        { label: "Deep Cleaning", href: Routes.SERVICE_DEEP_CLEANING },
        {
          label: "Restaurant Cleaning",
          href: Routes.SERVICE_RESTAURANT_CLEANING,
        },
        { label: "Airbnb Cleaning", href: Routes.SERVICE_AIRBNB_CLEANING },
        { label: "Mould Cleaning", href: Routes.SERVICE_MOULD_CLEANING },
      ],
    },
    {
      title: "Contact Info",
      links: [
        { label: "0451210238", href: "tel:+0451210238", icon: Phone },
        {
          label: "cleaningsydney102@gmail.com",
          href: "mailto:cleaningsydney102@gmail.com",
          icon: Mail,
        },
        { label: "Sydney, Australia", href: "#", icon: MapPin },
      ],
    },
  ];

  const socials = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/sydney.spotlesscleaning",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/sydney.spotlesscleaning/",
      label: "Instagram",
    },
    { icon: TikTokIcon, href: "https://linkedin.com", label: "TikTok" },
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
                  className="flex flex-col items-center gap-1   flex-shrink-0 group"
                >
                  <div className="relative transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                    <NextAvatar
                      src={logo}
                      alt="logo"
                      className="relative w-20 h-20"
                    />
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-lg font-black text-white leading-tight tracking-tight">
                      N&T Spotless Cleaning
                    </span>
                  </div>
                  {/* <div className="relative transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-50 transition-opacity duration-300  group-hover:opacity-0" />
                    <img src="/logo_header_v3.png" className="relative h-18 " />
                  </div> */}
                </Link>
              </div>

              <p className="text-white text-sm leading-relaxed mb-6">
                Professional cleaning services you can trust. Making Sydney
                cleaner, one space at a time.
              </p>
              {/* Social links */}
              <div className="flex gap-4  [&>a:last-child_path]:fill-primary [&>a:last-child:hover_svg_path]:fill-white">
                {socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -4 }}
                      className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white  flex items-center justify-center transition-colors"
                      title={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
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
                          className="text-white hover:text-primary transition-colors text-sm flex items-center gap-2 cursor-pointer"
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
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white"
          >
            <p>© {currentYear} Spotless Cleaning. All Rights Reserved.</p>
            <div className="flex gap-6">
              <motion.a
                href="#"
                whileHover={{ color: "#0A84FF" }}
                className="hover:text-primary transition-colors cursor-pointer text-white"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: "#0A84FF" }}
                className="hover:text-primary transition-colors cursor-pointer text-white"
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
