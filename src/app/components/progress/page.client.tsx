"use client";
import {
  AnimatedCircularProgressBar,
  Card,
  Col,
  Progress,
  Row,
  Text,
} from "@/components/ui";
import Flex from "@/components/ui/Flex";

export const ProgressComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Progress</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Displays a progress bar related to a task.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5">Basic progress</Text>
        <Card
          className="border rounded-4xl flex mt-5 "
          padding="24px"
          classNameWrapper="gap-10"
        >
          <Flex align={"center"} justify={"center"} gap={24}>
            <Progress value={50} classWrapper="flex-1" />
            <Progress value={50} text="50%" classWrapper="flex-1" />
            <AnimatedCircularProgressBar
              value={50}
              max={100}
              min={0}
              strokePercent={false}
              className="!size-[52px] !min-h-[52px] !min-w-[52px] flex-1"
              strokeWidthCircle={6.5}
              gaugePrimaryColor="var(--primary)"
              gaugeSecondaryColor="var(--border)"
              format={(percent) => (
                <Flex vertical align={"center"}>
                  <Text
                    weight={700}
                    color="var(--primary)"
                    className="leading-[14px]"
                  >
                    {`50%`}
                  </Text>
                </Flex>
              )}
            />
          </Flex>
        </Card>
      </div>

      <div className="mt-5">
        <Text variant="h5">Color progress</Text>
        <Card
          className="border rounded-4xl flex mt-5 "
          padding="24px"
          classNameWrapper="gap-10"
        >
          <Row
            gutter={"lg"}
            cols={12}
            align={"middle"}
            className="w-1/2 m-auto"
          >
            <Col span={10}>
              <Progress value={50} color="default" />
            </Col>
            <Col span={2}>
              <Text className="block">Default</Text>
            </Col>
            <Col span={10}>
              <Progress value={50} />
            </Col>
            <Col span={2}>
              <Text className="block text-primary">Primary</Text>
            </Col>
            <Col span={10}>
              <Progress value={50} color="secondary" />
            </Col>
            <Col span={2}>
              <Text className="block text-secondary">Secondary</Text>
            </Col>
            <Col span={10}>
              <Progress value={50} color="success" />
            </Col>
            <Col span={2}>
              <Text className="block text-success">Success</Text>
            </Col>
            <Col span={10}>
              <Progress value={50} color="warning" />
            </Col>
            <Col span={2}>
              <Text className="block text-warning">Warning</Text>
            </Col>
            <Col span={10}>
              <Progress value={50} color="info" />
            </Col>
            <Col span={2}>
              <Text className="block text-info">Info</Text>
            </Col>

            <Col span={10}>
              <Progress value={50} color="error" />
            </Col>
            <Col span={2}>
              <Text className="block text-destructive">Error</Text>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};
