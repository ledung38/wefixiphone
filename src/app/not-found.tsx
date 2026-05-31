"use client";

import Link from "next/link";

import { Button, Container, Text } from "@/components/ui";
import animationData from "@/lib/assets/lotties/404.json";
import Lottie from "lottie-react";

export default function NotFound() {
  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ height: 400 }}
      />
      <Text size={"large"}>Page not found</Text>
      <Button variant="text">
        <Link href="/" className="text-primary">
          Go back to home
        </Link>
      </Button>
    </Container>
  );
}
