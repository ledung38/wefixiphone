"use client";

import { useRouter } from "next/navigation";

type NavigateOptions = Parameters<ReturnType<typeof useRouter>["push"]>[1];

type TRouter = {
  push: (href: string, options?: NavigateOptions) => void;
  pushWithoutAnimation: (url: string) => void;
  pushToNewTab: (url: string) => void;
  back: () => void;
  replace: (href: string, options?: NavigateOptions) => void;
};

export const useAppRouter = () => {
  const router = useRouter();
  const otherRouter = {} as TRouter;

  const { push, back, replace } = router;

  otherRouter.push = async (...args) => {
    return push(...args);
  };

  otherRouter.pushWithoutAnimation = async (...args) => {
    return push(...args);
  };

  otherRouter.pushToNewTab = async (url) => {
    window.open(url, "_blank");
    return;
  };

  otherRouter.back = async () => {
    back();
  };

  otherRouter.replace = async (url: string) => {
    return replace(url);
  };

  return otherRouter;
};
