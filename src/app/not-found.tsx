"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";

const NotFoundAnimation = dynamic(
  () =>
    Promise.all([
      import("lottie-react"),
      import("@/lib/assets/lotties/404.json"),
    ]).then(([lottieMod, jsonMod]) => {
      const Lottie = lottieMod.default;
      return function Animation() {
        return (
          <Lottie
            animationData={jsonMod.default}
            loop
            autoplay
            style={{ height: 400 }}
          />
        );
      };
    }),
  { ssr: false, loading: () => <div style={{ height: 400 }} /> },
);

export default function NotFound() {
  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <NotFoundAnimation />
      <Text size={"large"}>Page not found</Text>
      <Button variant="text">
        <Link href="/" className="text-primary">
          Go back to home
        </Link>
      </Button>
    </Container>
  );
}
