import { REPAIR_PRICES } from "@/lib/data/repairPrices";

export const calculatePrice = (
  model: string,
  part: string,
  quality: string,
): number => {
  const prices = REPAIR_PRICES[model] || REPAIR_PRICES["iphone-x"];

  if (part === "screen") {
    if (quality.includes("Standard")) return prices.screenStandard;
    if (quality.includes("Genuine")) return prices.screenGenuine;
    return prices.screenPremium;
  }

  if (part === "battery") {
    if (quality.includes("Standard")) return prices.batteryStandard;
    if (quality.includes("Genuine")) return prices.batteryGenuine;
    return prices.batteryPremium;
  }

  switch (part) {
    case "back-glass":
      return prices.backGlass;
    case "charging":
      return prices.chargingPort;
    case "rear-camera":
    case "camera":
      return prices.camera;
    case "camera-lens":
      return prices.cameraLens;
    case "front-camera":
      return prices.frontCamera;
    case "audio":
      return prices.audio;
    case "power-button":
      return prices.powerButtonFlex;
    case "wifi-bluetooth":
      return prices.wifiBluetooth;
    case "microphone":
      return prices.microphone;
    case "housing":
      return prices.housing || 0;
    case "software":
      return prices.software;
    case "other":
    default:
      return 0;
  }
};
