"use client";
import { Container, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";
import { motion } from "motion/react";
import Link from "next/link";

export const AnimateContainer = motion(Container);
export const AnimateFlex = motion(Flex);
export const AnimateText = motion(Text);
export const AnimateLink = motion(Link);
export const AnimateDiv = motion(`div`);
export const AnimateSpan = motion(`span`);
export const AnimateButton = motion(`button`);
export const AnimateP = motion(`p`);
export const AnimateUl = motion(`ul`);
export const AnimateLi = motion(`li`);
export const AnimateTr = motion(`tr`);
export const AnimateTd = motion(`td`);
