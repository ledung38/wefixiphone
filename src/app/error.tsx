"use client";

import { useTransition } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";

const ErrorAnimation = dynamic(
  () =>
    Promise.all([
      import("lottie-react"),
      import("@/lib/assets/lotties/error.json"),
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

// Error boundaries must be Client Components
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
      <ErrorAnimation />

      <h2 className="text-xl font-bold mb-4">
        Something went wrong, please try again!
      </h2>
      <Button
        variant={"text"}
        color="primary"
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            reset();
          });
        }}
      >
        {isPending ? "Retrying..." : "Try again"}
      </Button>
    </div>
  );
}
