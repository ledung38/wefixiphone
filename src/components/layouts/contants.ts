import { Routes } from "@/lib/enum/routes";

export interface MenuItem {
  key: string;
  label: string;
  children?: Array<{ key: string; label: string }>;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    key: Routes.HOME,
    label: "Home",
  },
  {
    key: "/#services",
    label: "Services",
  },
  {
    key: Routes.PRICING,
    label: "Pricing",
  },
  {
    key: Routes.BOOKING,
    label: "Book a Repair",
  },
];
