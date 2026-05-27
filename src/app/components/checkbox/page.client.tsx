"use client";
import { Card, Checkbox, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";

export const CheckboxComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Checkbox</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Checkboxes allow the user to select one or more items from a set.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div>
        <Text variant="h5">Base and size</Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Checkbox
              containerClassName="mb-4"
              label="Disabled"
              disabled
              size={"sm"}
              variant={"primary"}
            />
            <Checkbox
              containerClassName="mb-4"
              label="Small"
              size={"sm"}
              variant={"primary"}
            />
            <Checkbox
              containerClassName="mb-4"
              label="Medium"
              size={"md"}
              variant={"primary"}
            />
            <Checkbox
              containerClassName="mb-4"
              label="Large"
              size={"lg"}
              variant={"primary"}
            />
            <Checkbox
              containerClassName="mb-4"
              label="XL"
              size={"3xl"}
              variant={"primary"}
            />
          </Flex>
        </Card>
      </div>

      <div>
        <Text variant="h5">Color</Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Checkbox containerClassName="mb-4" label="Default" />
            <Checkbox
              containerClassName="mb-4"
              label="Primary"
              variant={"primary"}
            />

            <Checkbox
              containerClassName="mb-4"
              label="Secondary"
              variant={"secondary"}
            />
            <Checkbox
              containerClassName="mb-4"
              label="Success"
              variant={"success"}
            />
            <Checkbox containerClassName="mb-4" label="Info" variant={"info"} />
            <Checkbox
              containerClassName="mb-4"
              label="Warning"
              variant={"warning"}
            />
            <Checkbox
              containerClassName="mb-4"
              label="Error"
              variant={"error"}
            />
          </Flex>
        </Card>
      </div>
    </div>
  );
};
