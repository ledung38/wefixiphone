"use client";
import {
  Button,
  Col,
  Row,
  Slider,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import {
  HandCoins,
  HandGrab,
  HandHeartIcon,
  HandIcon,
  HandshakeIcon,
  HelpCircleIcon,
  History,
} from "lucide-react";
import React from "react";

export const TooltipComponent = () => {
  const [value, setValue] = React.useState<number[]>([30, 70]);
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Tooltip</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Simple text popup box.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5">Basic Tooltip</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12} className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text>Xin chào</Text>
              </TooltipTrigger>
              <TooltipContent color="primary">
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text>Arrow</Text>
              </TooltipTrigger>
              <TooltipContent allowArrow color="primary">
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <HandshakeIcon />
              </TooltipTrigger>
              <TooltipContent allowArrow color="primary">
                <span>Icon</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Button variant={"container"}>Button</Button>
              </TooltipTrigger>
              <TooltipContent allowArrow color="primary">
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <Text variant="h5">Color Tooltip</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={24} className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text>Default</Text>
              </TooltipTrigger>
              <TooltipContent allowArrow>
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text color="var(--primary)">Primary</Text>
              </TooltipTrigger>
              <TooltipContent color="primary" allowArrow>
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text color="var(--secondary)">Secondary</Text>
              </TooltipTrigger>
              <TooltipContent color="secondary" allowArrow>
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text color="var(--success)">Success</Text>
              </TooltipTrigger>
              <TooltipContent color="success" allowArrow>
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text color="var(--warning)">Warning</Text>
              </TooltipTrigger>
              <TooltipContent color="warning" allowArrow>
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text color="var(--info)">Info</Text>
              </TooltipTrigger>
              <TooltipContent color="info" allowArrow>
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text color="var(--destructive)">Error</Text>
              </TooltipTrigger>
              <TooltipContent color="error" allowArrow>
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <Text variant="h5">Position Tooltip</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12} className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text>Top</Text>
              </TooltipTrigger>
              <TooltipContent color="primary" allowArrow>
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text>Right</Text>
              </TooltipTrigger>
              <TooltipContent
                color="primary"
                allowArrow
                side="right"
                sideOffset={5}
              >
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text>Bottom</Text>
              </TooltipTrigger>
              <TooltipContent
                color="primary"
                allowArrow
                side="bottom"
                sideOffset={5}
              >
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer" asChild>
                <Text>Left</Text>
              </TooltipTrigger>
              <TooltipContent
                color="primary"
                allowArrow
                side="left"
                sideOffset={5}
              >
                <span>LD - Design xin chào</span>
              </TooltipContent>
            </Tooltip>
          </Col>
        </Row>
      </div>
    </div>
  );
};
