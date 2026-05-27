"use client";
import { Card, CardContent, CardHeader, Col, Row, Text } from "@/components/ui";

export const CardComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Card</Text>
      <Text size={"medium"} as="p" className="mt-5">
        A container for displaying information.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5">Basic Cards</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12}>
            <Card className="border rounded-4xl flex" padding="24px">
              <Text>Content</Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="border rounded-4xl flex">
              <CardHeader className="p-6 border-b ">Title</CardHeader>
              <CardContent className="p-6 ">Content</CardContent>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <Text variant="h5">Linear Border Cards</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12}>
            <Card
              variant="borderLinear"
              className="border rounded-4xl flex"
              padding="24px"
            >
              <Text className="text-black">Border linear default</Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              variant="borderLinear"
              type="success"
              className="border rounded-4xl flex"
              padding="24px"
            >
              <Text className="text-black">Border linear success</Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              variant="borderLinear"
              type="purple"
              className="border rounded-4xl flex"
              padding="24px"
            >
              <Text className="text-black">Border linear purple</Text>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <Text variant="h5">Linear Background Cards</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12}>
            <div>
              <Card
                className="border rounded-4xl flex"
                padding="24px"
                variant="linear"
              >
                <Text>Border linear default</Text>
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <Card
              type="success"
              variant="linear"
              className="border rounded-4xl flex"
              padding="24px"
            >
              <Text>Border linear success</Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              type="purple"
              variant="linear"
              className="border rounded-4xl flex"
              padding="24px"
            >
              <Text>Border linear purple</Text>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
