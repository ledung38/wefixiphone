"use client";
import { Card, Checkbox, Switch, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";

export const SwitchComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Switch</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Switches toggle the state of a single setting on or off.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div>
        <Text variant="h5">Basic switches</Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Switch defaultChecked></Switch>
            <Switch disabled></Switch>
            <Switch defaultChecked>Label</Switch>
            <Switch disabled>Label</Switch>
          </Flex>
        </Card>
      </div>

      <div>
        <Text variant="h5">Size</Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Switch defaultChecked size={"sm"}></Switch>
            <Switch defaultChecked size={"md"}></Switch>
            <Switch defaultChecked size={"lg"}>
              Label
            </Switch>
            <Switch defaultChecked size={"3xl"}>
              Label
            </Switch>
          </Flex>
        </Card>
      </div>

      <div>
        <Text variant="h5">Color</Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Switch defaultChecked></Switch>
            <Switch defaultChecked color="secondary"></Switch>
            <Switch defaultChecked color="success"></Switch>
            <Switch defaultChecked color="warning"></Switch>
            <Switch defaultChecked color="info"></Switch>
            <Switch defaultChecked color="error"></Switch>
          </Flex>
        </Card>
      </div>
    </div>
  );
};
