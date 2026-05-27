"use client";
import { Text } from "@/components/ui";
import React from "react";

export const TypographyComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Typography</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Use typography to present your design and content as clearly and
        efficiently as possible.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>
      <div className="flex flex-col gap-2 justify-center py-10 px-50 border rounded-4xl mt-8">
        <Text variant="h1" className="text-primary">
          h1. Heading
        </Text>
        <Text variant="h2" className="text-secondary">
          h2. Heading
        </Text>
        <Text variant="h3" className="text-accent">
          h3. Heading
        </Text>
        <Text variant="h4" className="text-muted-foreground">
          h4. Heading
        </Text>
        <Text variant="h5" className="text-warning">
          h5. Heading
        </Text>
        <Text variant="h6" className="text-destructive">
          h6. Heading
        </Text>
        <Text variant="subtitle" className="text-success">
          Subtitle. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Text>
        <Text variant="body" className="text-info">
          Body. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur
        </Text>
        <Text variant="small" className="text-gradient-accent">
          Small. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur
        </Text>
      </div>
    </div>
  );
};
