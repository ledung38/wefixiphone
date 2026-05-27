import { Routes } from "@/lib/enum/routes";

export const MENU_ITEMS = [
  {
    key: Routes.HOME,
    label: "Home",
  },

  {
    key: Routes.SERVICE,
    label: "Service",
    children: [
      {
        label: "End of Lease Cleaning",
        key: Routes.SERVICE_END_OF_LEASE_CLEANING,
      },
      {
        label: "Regular Cleaning",
        key: Routes.SERVICE_REGULAR_CLEANING,
      },
      {
        label: "Deep Cleaning",
        key: Routes.SERVICE_DEEP_CLEANING,
      },
      {
        label: "Restaurant Cleaning",
        key: Routes.SERVICE_RESTAURANT_CLEANING,
      },
      {
        label: "Airbnb Cleaning",
        key: Routes.SERVICE_AIRBNB_CLEANING,
      },
      {
        label: "Mould Cleaning",
        key: Routes.SERVICE_MOULD_CLEANING,
      },
    ],
  },
  {
    key: Routes.PRICING,
    label: "Pricing",
  },
  {
    key: Routes.ABOUT_US,
    label: "About us",
  },
];
