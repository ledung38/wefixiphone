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
    children: [
      { key: `${Routes.PRICING}?part=screen`, label: "Screen Replacement" },
      { key: `${Routes.PRICING}?part=battery`, label: "Battery Replacement" },
      {
        key: `${Routes.PRICING}?part=back-glass`,
        label: "Back Glass Replacement",
      },
      { key: `${Routes.PRICING}?part=charging`, label: "Charging Port Repair" },
      { key: `${Routes.PRICING}?part=camera`, label: "Rear Camera Repair" },
      {
        key: `${Routes.PRICING}?part=front-camera`,
        label: "Front Camera Repair",
      },
      { key: `${Routes.PRICING}?part=audio`, label: "Speaker & Audio Repair" },
      { key: `${Routes.PRICING}?part=housing`, label: "Housing Replacement" },
      // { key: `${Routes.PRICING}?part=software`, label: "Software Repair" },
    ],
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
