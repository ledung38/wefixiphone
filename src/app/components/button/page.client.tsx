"use client";
import { Button, Card, Col, Row, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";
import { BoxIcon, Icon } from "lucide-react";
import React from "react";

export const ButtonComponent = () => {
  return (
    <div className="flex flex-col gap-5 mx-auto w-[800px]">
      <div>
        <Text variant="h1">Button</Text>
        <Text size={"medium"} as="p" className="mt-5">
          Buttons allow users to take actions, and make choices, with a single
          tap.
        </Text>
      </div>
      <div>
        <Text variant="h3" className="block">
          Example
        </Text>
      </div>
      <div>
        <Text variant="h5">Variant</Text>
        <Text className="block">
          {`You can set variant attributes at the same time can derive more
            variant buttons. Type of variant is "text", "container", "outline",
            "dashed", "filled", "link".`}
        </Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"}>TEXT</Button>
            <Button variant={"container"}>CONTAINER</Button>
            <Button variant={"outline"}>OUTLINED</Button>
            <Button variant={"dashed"}>DASHED</Button>
            <Button variant={"filled"}>FILLED</Button>
            <Button variant={"link"}>LINK</Button>
          </Flex>
        </Card>
      </div>
      <div>
        <Text variant="h5">Color & Variant</Text>
        <Text className="block">
          You can set the color and variant attributes at the same time can
          derive more variant buttons.
        </Text>

        <Card className="border rounded-4xl flex mt-5 " gap={16} padding="24px">
          {/* Default */}
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"} color={"default"}>
              TEXT
            </Button>
            <Button variant={"container"} color={"default"}>
              CONTAINER
            </Button>
            <Button variant={"outline"} color={"default"}>
              OUTLINED
            </Button>
            <Button variant={"dashed"} color={"default"}>
              DASHED
            </Button>
            <Button variant={"filled"} color={"default"}>
              FILLED
            </Button>
            <Button variant={"link"} color={"default"}>
              LINK
            </Button>
          </Flex>
          {/* Primary */}
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"} color={"primary"}>
              TEXT
            </Button>
            <Button variant={"container"} color={"primary"}>
              CONTAINER
            </Button>
            <Button variant={"outline"} color={"primary"}>
              OUTLINED
            </Button>
            <Button variant={"dashed"} color={"primary"}>
              DASHED
            </Button>
            <Button variant={"filled"} color={"primary"}>
              FILLED
            </Button>
            <Button variant={"link"} color={"primary"}>
              LINK
            </Button>
          </Flex>
          {/* Secondary */}
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"} color={"secondary"}>
              TEXT
            </Button>
            <Button variant={"container"} color={"secondary"}>
              CONTAINER
            </Button>
            <Button variant={"outline"} color={"secondary"}>
              OUTLINED
            </Button>
            <Button variant={"dashed"} color={"secondary"}>
              DASHED
            </Button>
            <Button variant={"filled"} color={"secondary"}>
              FILLED
            </Button>
            <Button variant={"link"} color={"secondary"}>
              LINK
            </Button>
          </Flex>
          {/* Success */}
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"} color={"success"}>
              TEXT
            </Button>
            <Button variant={"container"} color={"success"}>
              CONTAINER
            </Button>
            <Button variant={"outline"} color={"success"}>
              OUTLINED
            </Button>
            <Button variant={"dashed"} color={"success"}>
              DASHED
            </Button>
            <Button variant={"filled"} color={"success"}>
              FILLED
            </Button>
            <Button variant={"link"} color={"success"}>
              LINK
            </Button>
          </Flex>
          {/* Warning */}
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"} color={"warning"}>
              TEXT
            </Button>
            <Button variant={"container"} color={"warning"}>
              CONTAINER
            </Button>
            <Button variant={"outline"} color={"warning"}>
              OUTLINED
            </Button>
            <Button variant={"dashed"} color={"warning"}>
              DASHED
            </Button>
            <Button variant={"filled"} color={"warning"}>
              FILLED
            </Button>
            <Button variant={"link"} color={"warning"}>
              LINK
            </Button>
          </Flex>
          {/* Info */}
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"} color={"info"}>
              TEXT
            </Button>
            <Button variant={"container"} color={"info"}>
              CONTAINER
            </Button>
            <Button variant={"outline"} color={"info"}>
              OUTLINED
            </Button>
            <Button variant={"dashed"} color={"info"}>
              DASHED
            </Button>
            <Button variant={"filled"} color={"info"}>
              FILLED
            </Button>
            <Button variant={"link"} color={"info"}>
              LINK
            </Button>
          </Flex>
          {/* Error */}
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"} color={"error"}>
              TEXT
            </Button>
            <Button variant={"container"} color={"error"}>
              CONTAINER
            </Button>
            <Button variant={"outline"} color={"error"}>
              OUTLINED
            </Button>
            <Button variant={"dashed"} color={"error"}>
              DASHED
            </Button>
            <Button variant={"filled"} color={"error"}>
              FILLED
            </Button>
            <Button variant={"link"} color={"error"}>
              LINK
            </Button>
          </Flex>
        </Card>
      </div>
      <div>
        <Text variant="h5">Disable</Text>
        <Text className="block">
          You can disable the button by adding the disabled prop.
        </Text>
        <Card
          className="border rounded-4xl flex mt-5 "
          padding="24px"
          classNameWrapper="justify-center items-center"
        >
          <Flex gap={16} direction={"column"} className="max-w-fit">
            <Flex gap={16}>
              <Button variant={"text"} disabled>
                TEXT
              </Button>
              <Button variant={"text"}>TEXT</Button>
            </Flex>
            <Flex gap={16}>
              <Button variant={"container"} disabled>
                CONTAINER
              </Button>
              <Button variant={"container"}>CONTAINER</Button>
            </Flex>
            <Flex gap={16}>
              <Button variant={"outline"} disabled>
                OUTLINED
              </Button>
              <Button variant={"outline"}>OUTLINED</Button>
            </Flex>
            <Flex gap={16}>
              <Button variant={"dashed"} disabled>
                DASHED
              </Button>
              <Button variant={"dashed"}>DASHED</Button>
            </Flex>
            <Flex gap={16}>
              <Button variant={"filled"} disabled>
                FILLED
              </Button>
              <Button variant={"filled"}>FILLED</Button>
            </Flex>
            <Flex gap={16}>
              <Button variant={"link"} disabled>
                LINK
              </Button>
              <Button variant={"link"}>LINK</Button>
            </Flex>
          </Flex>
        </Card>
      </div>
      {/* Sizes */}
      <div>
        <Text variant="h5">Sizes</Text>
        <Text className="block">
          For larger or smaller buttons, use the size prop.
        </Text>
        <Card
          className="border rounded-4xl flex mt-5 "
          padding="24px"
          classNameWrapper="justify-center items-center"
        >
          <Flex gap={16} direction={"column"} className="max-w-fit">
            <Flex gap={16} align={"center"}>
              <Button variant={"text"} size={"icon"} color="primary">
                <BoxIcon />
              </Button>
              <Button variant={"text"} size={"sm"} color="primary">
                SMALL
              </Button>
              <Button variant={"text"} size={"default"} color="primary">
                DEFAULT
              </Button>
              <Button variant={"text"} size={"lg"} color="primary">
                LARGE
              </Button>
              <Button variant={"text"} size={"xLg"} color="primary">
                XLARGE
              </Button>
            </Flex>

            <Flex gap={16} align={"center"}>
              <Button variant={"container"} size={"icon"} color="primary">
                <BoxIcon />
              </Button>
              <Button variant={"container"} size={"sm"} color="primary">
                SMALL
              </Button>
              <Button variant={"container"} size={"default"} color="primary">
                DEFAULT
              </Button>
              <Button variant={"container"} size={"lg"} color="primary">
                LARGE
              </Button>
              <Button variant={"container"} size={"xLg"} color="primary">
                XLARGE
              </Button>
            </Flex>

            <Flex gap={16} align={"center"}>
              <Button variant={"outline"} size={"icon"} color="primary">
                <BoxIcon />
              </Button>
              <Button variant={"outline"} size={"sm"} color="primary">
                SMALL
              </Button>
              <Button variant={"outline"} size={"default"} color="primary">
                DEFAULT
              </Button>
              <Button variant={"outline"} size={"lg"} color="primary">
                LARGE
              </Button>
              <Button variant={"outline"} size={"xLg"} color="primary">
                XLARGE
              </Button>
            </Flex>
            <Flex gap={16} align={"center"}>
              <Button variant={"dashed"} size={"icon"} color="primary">
                <BoxIcon />
              </Button>
              <Button variant={"dashed"} size={"sm"} color="primary">
                SMALL
              </Button>
              <Button variant={"dashed"} size={"default"} color="primary">
                DEFAULT
              </Button>
              <Button variant={"dashed"} size={"lg"} color="primary">
                LARGE
              </Button>
              <Button variant={"dashed"} size={"xLg"} color="primary">
                XLARGE
              </Button>
            </Flex>

            <Flex gap={16} align={"center"}>
              <Button variant={"filled"} size={"icon"} color="primary">
                <BoxIcon />
              </Button>
              <Button variant={"filled"} size={"sm"} color="primary">
                SMALL
              </Button>
              <Button variant={"filled"} size={"default"} color="primary">
                DEFAULT
              </Button>
              <Button variant={"filled"} size={"lg"} color="primary">
                LARGE
              </Button>
              <Button variant={"filled"} size={"xLg"} color="primary">
                XLARGE
              </Button>
            </Flex>

            <Flex gap={16} align={"center"}>
              <Button variant={"link"} size={"icon"} color="primary">
                <BoxIcon />
              </Button>
              <Button variant={"link"} size={"sm"} color="primary">
                SMALL
              </Button>
              <Button variant={"link"} size={"default"} color="primary">
                DEFAULT
              </Button>
              <Button variant={"link"} size={"lg"} color="primary">
                LARGE
              </Button>
              <Button variant={"link"} size={"xLg"} color="primary">
                XLARGE
              </Button>
            </Flex>
          </Flex>
        </Card>
      </div>

      {/* Loading */}
      <div>
        <Text variant="h5">Loading</Text>
        <Text className="block">
          A loading indicator can be added to a button by setting the loading
          property on the Button.
        </Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Button variant={"text"} loading>
              TEXT
            </Button>
            <Button variant={"container"} loading>
              CONTAINER
            </Button>
            <Button variant={"outline"} loading>
              OUTLINED
            </Button>
            <Button variant={"dashed"} loading>
              DASHED
            </Button>
            <Button variant={"filled"} loading>
              FILLED
            </Button>
            <Button variant={"link"} loading>
              LINK
            </Button>
          </Flex>
        </Card>
      </div>
    </div>
  );
};
