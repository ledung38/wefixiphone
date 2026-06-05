import { MetadataRoute } from "next";
import { IPHONE_MODELS, PARTS } from "@/modules/pricing/constants/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.wefixiphone.com.au";

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Generate dynamic combinations of iPhone models and repair parts for search indexing
  const dynamicPricingRoutes = IPHONE_MODELS.flatMap((model) =>
    PARTS.map((part) => ({
      url: `${baseUrl}/pricing?model=${model.id}&part=${part.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  return [...routes, ...dynamicPricingRoutes];
}
