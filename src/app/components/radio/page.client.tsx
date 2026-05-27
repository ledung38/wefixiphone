"use client";
import { Card, Checkbox, Radio, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";

export const RadioComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Radio</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Used to select a single state from multiple options.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div>
        <Text variant="h5">Base and size</Text>
        <Text className="block">
          Default size: <code>md</code>
        </Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Radio
              color="primary"
              className="ml-3"
              options={[
                { value: "1", label: "Item 1", disabled: true, size: "sm" },
                { value: "2", label: "Item 2", size: "sm" },
                { value: "3", label: "Item 3", size: "md" },
                { value: "4", label: "Item 4", size: "lg" },
              ]}
            />
          </Flex>
        </Card>
      </div>

      <div>
        <Text variant="h5">Color</Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Radio
              className="ml-3"
              options={[
                { value: "1", label: "Item 1" },
                { value: "2", label: "Item 2", color: "primary" },
                { value: "3", label: "Item 3", color: "secondary" },
                { value: "4", label: "Item 4", color: "success" },
                { value: "5", label: "Item 5", color: "warning" },
                { value: "6", label: "Item 6", color: "info" },
                { value: "7", label: "Item 7", color: "error" },
              ]}
            />
          </Flex>
        </Card>
      </div>
    </div>
  );
};
