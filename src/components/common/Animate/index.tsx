import { Container, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";
import { motion } from "motion/react";
import Link from "next/link";

export const AnimateContainer = motion(Container);
export const AnimateFlex = motion(Flex);
export const AnimateText = motion(Text);
export const AnimateLink = motion(Link);
