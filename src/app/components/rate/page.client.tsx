"use client";
import { Card, Checkbox, Radio, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";
import Rate from "@/components/ui/Rate";

export const RateComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Rating</Text>
      <Text size={"medium"} as="p" className="mt-5">
        {`Ratings provide insight regarding others' opinions and experiences, and can allow the user to submit a rating of their own.`}
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div>
        <Text variant="h5">Basic rating</Text>

        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex
            align={"center"}
            justify={"center"}
            gap={16}
            direction={"column"}
          >
            <Rate size={20} className="mb-1" readOnly value={4} />
            <Rate size={20} className="mb-1" defaultValue={2} />
            <Rate size={20} disabled className="mb-1" value={2} />
            <Rate size={20} disabled className="mb-1" />
            <Rate size={20} className="mb-1" readOnly value={4} showInfo />
          </Flex>
        </Card>
      </div>
    </div>
  );
};
