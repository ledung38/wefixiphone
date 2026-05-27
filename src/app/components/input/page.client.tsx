"use client";
import { CheckBig, SearchIcon } from "@/components/icons";
import { Card, Input, Text } from "@/components/ui";
import { DateFormDemo } from "@/components/ui/DatePicker";
import Flex from "@/components/ui/Flex";

export const InputComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Input</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Through mouse or keyboard input content, it is the most basic form field
        wrapper.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div>
        <Text variant="h5">Basic Inputes</Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Input placeholder="Mời nhập" />
            <Input placeholder="Mời nhập" suffix={<SearchIcon />} />
            <Input placeholder="Mời nhập" prefix={<CheckBig />} />
          </Flex>
        </Card>
      </div>

      <div>
        <Text variant="h5">Date Picker</Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <DateFormDemo />
          </Flex>
        </Card>
      </div>
    </div>
  );
};
