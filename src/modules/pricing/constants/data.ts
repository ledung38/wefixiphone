export interface PhoneModel {
  id: string;
  name: string;
  baseScreen: number;
  baseBattery: number;
  gen: number;
}

export const IPHONE_MODELS: PhoneModel[] = [
  { id: "iphone-x", name: "iPhone X", baseScreen: 99, baseBattery: 79, gen: 1 },
  {
    id: "iphone-xr",
    name: "iPhone XR",
    baseScreen: 99,
    baseBattery: 79,
    gen: 1,
  },
  {
    id: "iphone-xs",
    name: "iPhone XS",
    baseScreen: 109,
    baseBattery: 79,
    gen: 1,
  },
  {
    id: "iphone-xs-max",
    name: "iPhone XS Max",
    baseScreen: 119,
    baseBattery: 89,
    gen: 1,
  },
  {
    id: "iphone-11",
    name: "iPhone 11",
    baseScreen: 99,
    baseBattery: 89,
    gen: 2,
  },
  {
    id: "iphone-11-pro",
    name: "iPhone 11 Pro",
    baseScreen: 119,
    baseBattery: 99,
    gen: 2,
  },
  {
    id: "iphone-11-pro-max",
    name: "iPhone 11 Pro Max",
    baseScreen: 139,
    baseBattery: 109,
    gen: 2,
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    baseScreen: 129,
    baseBattery: 99,
    gen: 3,
  },
  {
    id: "iphone-12-pro",
    name: "iPhone 12 Pro",
    baseScreen: 149,
    baseBattery: 109,
    gen: 3,
  },
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    baseScreen: 169,
    baseBattery: 119,
    gen: 3,
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    baseScreen: 149,
    baseBattery: 109,
    gen: 4,
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    baseScreen: 169,
    baseBattery: 119,
    gen: 4,
  },
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    baseScreen: 189,
    baseBattery: 129,
    gen: 4,
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    baseScreen: 179,
    baseBattery: 129,
    gen: 5,
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    baseScreen: 199,
    baseBattery: 139,
    gen: 5,
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    baseScreen: 219,
    baseBattery: 149,
    gen: 5,
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    baseScreen: 220,
    baseBattery: 149,
    gen: 6,
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    baseScreen: 250,
    baseBattery: 159,
    gen: 6,
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    baseScreen: 290,
    baseBattery: 169,
    gen: 6,
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    baseScreen: 260,
    baseBattery: 159,
    gen: 7,
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    baseScreen: 290,
    baseBattery: 169,
    gen: 7,
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    baseScreen: 330,
    baseBattery: 179,
    gen: 7,
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    baseScreen: 290,
    baseBattery: 169,
    gen: 8,
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    baseScreen: 340,
    baseBattery: 179,
    gen: 8,
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    baseScreen: 390,
    baseBattery: 189,
    gen: 8,
  },
];

export interface RepairPart {
  id: string;
  name: string;
}

export const PARTS: RepairPart[] = [
  { id: "screen", name: "Screen Replacement" },
  { id: "battery", name: "Battery Replacement" },
  { id: "back-glass", name: "Back Glass Replacement" },
  { id: "charging", name: "Charging Port Repair" },
  { id: "camera", name: "Camera Repair" },
  { id: "audio", name: "Speaker & Audio Repair" },
  { id: "housing", name: "Housing Replacement" },
];

export const BOOKING_PARTS: RepairPart[] = [
  { id: "screen", name: "Screen Replacement" },
  { id: "battery", name: "Battery Replacement" },
  { id: "back-glass", name: "Back Glass Replacement" },
  { id: "charging", name: "Charging Port Repair" },
  { id: "rear-camera", name: "Rear Camera Issue" },
  { id: "front-camera", name: "Front Camera Issue" },
  { id: "audio", name: "Speaker & Audio Repair" },
  { id: "housing", name: "Housing Replacement" },
  { id: "other", name: "Other / Unsure (Describe below)" },
];

export interface ServiceDetail {
  title: string;
  duration: string;
  warranty: string;
  description: string;
  benefits: string[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "back-glass": {
    title: "Back Glass Replacement",
    duration: "45 mins",
    warranty: "12-Month Warranty",
    description:
      "Full glass back panel restoration to repair spiderweb cracks, loose falling glass shards, and keep internal electronics protected. Preserves MagSafe and wireless charging coils functioning seamlessly.",
    benefits: [
      "OEM-grade high-durability rear glass",
      "MagSafe & Wireless charging fully preserved",
      "Laser-precision fitting for dust/water seal",
      "Completed on-site in under 45 minutes",
    ],
  },
  charging: {
    title: "Charging Port Repair",
    duration: "20 mins",
    warranty: "12-Month Warranty",
    description:
      "Professional repair or replacement of the Lightning/USB-C charging dock assembly. Resolves issues with loose connections, failing to charge, or lack of computer synchronization.",
    benefits: [
      "Brand new premium charging port assembly",
      "Cleans and restores microphone & speaker contacts",
      "Full fast charging and data sync restored",
      "No more wiggling cables to charge",
    ],
  },
  camera: {
    title: "Camera Repair",
    duration: "20 mins",
    warranty: "12-Month Warranty",
    description:
      "Restores broken rear camera sensors, blurry focus, cracked external lens glass, or camera app shaking/black screen bugs. Uses original-spec replacement camera modules.",
    benefits: [
      "Crisp image focus and optical stabilization (OIS) restored",
      "Dust-free chamber cleaning during installation",
      "Cracked protective glass lens replaced",
      "Tested on-site for all zoom and portrait modes",
    ],
  },
  audio: {
    title: "Speaker & Audio Repair",
    duration: "25 mins",
    warranty: "12-Month Warranty",
    description:
      "Resolves low volume, muffled sound, crackling speaker noises, or failure of the microphone during calls. Restores crisp stereo sound.",
    benefits: [
      "New internal ear speaker or loud speaker module",
      "Mesh dust filter cleaning and replacement",
      "Clear voice call transmission restored",
      "Stereo audio output fully tested",
    ],
  },
  housing: {
    title: "Housing Replacement",
    duration: "60 mins",
    warranty: "12-Month Warranty",
    description:
      "Complete replacement of the iPhone outer aluminum/titanium frame chassis. Best for severely bent frames, deep structural dents, or damaged buttons.",
    benefits: [
      "Full premium metal body shell replacement",
      "Restores bent structures to prevent display pressure",
      "New volume, power, and mute buttons if needed",
      "Restores phone appearance to like-new condition",
    ],
  },
};
