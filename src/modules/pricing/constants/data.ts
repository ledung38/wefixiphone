export interface PhoneModel {
  id: string;
  name: string;
  baseScreen: number;
  baseBattery: number;
  gen: number;
  isBackGlassRemovable?: boolean;
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
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-14-plus",
    name: "iPhone 14 Plus",
    baseScreen: 189,
    baseBattery: 129,
    gen: 5,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    baseScreen: 199,
    baseBattery: 139,
    gen: 5,
    isBackGlassRemovable: false,
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    baseScreen: 219,
    baseBattery: 149,
    gen: 5,
    isBackGlassRemovable: false,
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    baseScreen: 220,
    baseBattery: 149,
    gen: 6,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    baseScreen: 240,
    baseBattery: 149,
    gen: 6,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    baseScreen: 250,
    baseBattery: 159,
    gen: 6,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    baseScreen: 290,
    baseBattery: 169,
    gen: 6,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    baseScreen: 260,
    baseBattery: 159,
    gen: 7,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-16-plus",
    name: "iPhone 16 Plus",
    baseScreen: 280,
    baseBattery: 159,
    gen: 7,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    baseScreen: 290,
    baseBattery: 169,
    gen: 7,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    baseScreen: 330,
    baseBattery: 179,
    gen: 7,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    baseScreen: 290,
    baseBattery: 169,
    gen: 8,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-17-plus",
    name: "iPhone 17 Plus",
    baseScreen: 310,
    baseBattery: 169,
    gen: 8,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    baseScreen: 340,
    baseBattery: 179,
    gen: 8,
    isBackGlassRemovable: true,
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    baseScreen: 390,
    baseBattery: 189,
    gen: 8,
    isBackGlassRemovable: true,
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
  { id: "camera", name: "Rear Camera Repair" },
  { id: "front-camera", name: "Front Camera Repair" },
  { id: "camera-lens", name: "Rear Camera Lens Replacement" },
  { id: "audio", name: "Speaker & Audio Repair" },
  { id: "power-button", name: "Power Button FLEX Repair" },
  { id: "wifi-bluetooth", name: "Wifi/Bluetooth (Antenna Flex) Repair" },
  { id: "microphone", name: "Microphone Issue Repair" },
  { id: "housing", name: "Housing Replacement" },
  { id: "other", name: "Other / Unsure (Describe issue)" },
  // { id: "software", name: "Software Repair" },
];

export const BOOKING_PARTS: RepairPart[] = [
  { id: "screen", name: "Screen Replacement" },
  { id: "battery", name: "Battery Replacement" },
  { id: "back-glass", name: "Back Glass Replacement" },
  { id: "charging", name: "Charging Port Repair" },
  { id: "rear-camera", name: "Rear Camera Issue" },
  { id: "camera-lens", name: "Rear Camera Lens Replacement" },
  { id: "front-camera", name: "Front Camera Issue" },
  { id: "audio", name: "Speaker & Audio Repair" },
  { id: "power-button", name: "Power Button FLEX Repair" },
  { id: "wifi-bluetooth", name: "Wifi/Bluetooth (Antenna Flex) Repair" },
  { id: "microphone", name: "Microphone Issue Repair" },
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
    title: "Back Camera Repair",
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
  "front-camera": {
    title: "Front Camera Repair",
    duration: "25 mins",
    warranty: "12-Month Warranty",
    description:
      "Replaces the front-facing camera assembly to resolve issues with blurry selfies, Face ID component misalignment, or cracked lens glass affecting the front sensor.",
    benefits: [
      "OEM-grade front camera sensor replacement",
      "Face ID functionality preserved and calibrated",
      "Selfie portrait mode focus fully restored",
      "Completed on-site by experienced technicians",
    ],
  },
  "camera-lens": {
    title: "Rear Camera Lens Replacement",
    duration: "20 mins",
    warranty: "12-Month Warranty",
    description:
      "Professional replacement of cracked, shattered, or scratched rear camera protective glass covers. Keeps dust, water droplets, and moisture out of your delicate camera sensor chamber.",
    benefits: [
      "OEM high-transmission replacement glass",
      "Debris & dust cleaning under professional chamber",
      "Restores clear photo capture without blurry spots",
      "Completed in under 20 minutes on-site",
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
  "power-button": {
    title: "Power Button FLEX Repair",
    duration: "30 mins",
    warranty: "12-Month Warranty",
    description:
      "Full replacement of the internal power button / sleep-wake flex cable assembly. Restores crisp tactile click feedback and solves issues with unresponsive buttons.",
    benefits: [
      "Premium tactile click action restoration",
      "Brand new power button flex assembly",
      "Tested on-site for immediate wake/sleep response",
      "Doesn't impact logic board components",
    ],
  },
  "wifi-bluetooth": {
    title: "Wifi/Bluetooth (Antenna Flex) Repair",
    duration: "35 mins",
    warranty: "12-Month Warranty",
    description:
      "Resolves weak Wi-Fi signal reception, grayed-out settings toggles, failing AirDrop connections, or constant Bluetooth audio dropouts by replacing the high-frequency antenna assembly.",
    benefits: [
      "High-gain OEM spec antenna replacement",
      "Restores maximum range and transfer speeds",
      "Fixes settings slider connectivity errors",
      "Thorough testing with active networks",
    ],
  },
  microphone: {
    title: "Microphone Issue Repair",
    duration: "25 mins",
    warranty: "12-Month Warranty",
    description:
      "Replaces the failing microphone module. Solves problems where callers can't hear you, FaceTime audio cuts out, or video recordings sound muffled and static.",
    benefits: [
      "Ultra-clear sound capturing capability",
      "Brand new lower microphone port array",
      "Cleans and clears dust grids during installation",
      "Fully tested with voice memo and phone applications",
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
