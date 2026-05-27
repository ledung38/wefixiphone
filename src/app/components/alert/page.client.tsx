"use client";
import { CheckCircleIcon } from "@/components/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Col,
  Row,
  Text,
} from "@/components/ui";

export const AlertComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Alert</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Displays a callout for user attention.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5">Basic Alert</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12}>
            <Alert>
              <AlertTitle>Default</AlertTitle>
            </Alert>
          </Col>
          <Col span={12}>
            <Alert icon={<CheckCircleIcon />}>
              <AlertTitle>Success! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <Text variant="h5">Color Alert</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12}>
            <Alert variant={"primary"}>
              <AlertTitle>Primary! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
          </Col>
          <Col span={12}>
            <Alert variant={"success"}>
              <AlertTitle>Success! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
          </Col>
          <Col span={12}>
            <Alert variant={"secondary"}>
              <AlertTitle>Secondary! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
          </Col>
          <Col span={12}>
            <Alert variant={"info"}>
              <AlertTitle>Info! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
          </Col>

          <Col span={12}>
            <Alert variant={"warning"}>
              <AlertTitle>Warning! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
          </Col>

          <Col span={12}>
            <Alert variant={"error"}>
              <AlertTitle>Error! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
          </Col>
        </Row>
      </div>
    </div>
  );
};
