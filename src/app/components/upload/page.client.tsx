"use client";
import { AddPlusCircleIcon } from "@/components/icons";
import { Button, Card, Text, Upload } from "@/components/ui";
import Flex from "@/components/ui/Flex";
import { UploadIcon } from "lucide-react";
import { useState } from "react";

export const UploadComponent = () => {
  const [fileList, setFileList] = useState<File[] | null>(null);

  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Upload</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Used to select and upload files or drag and drop files.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div>
        <Text variant="h5">Basic Uploades</Text>
        <Card
          className="border rounded-4xl flex mt-5 "
          padding="24px"
          classNameWrapper="gap-10"
        >
          <Flex align={"center"} justify={"center"} gap={16}>
            <Upload
              className="w-fit"
              noDrag
              onChange={(files) => {
                setFileList((prev) => [...(prev ?? []), ...files]);
              }}
            >
              <Button size="lg">
                <AddPlusCircleIcon className="size-[1.5rem] text-white" />
                Tải bài làm
              </Button>
            </Upload>
            {fileList && fileList.length > 0 && (
              <div className="flex flex-col gap-2">
                {fileList.map((file, index) => (
                  <div key={index}>
                    <Text>{file.name}</Text>
                  </div>
                ))}
              </div>
            )}
          </Flex>
          <Flex align={"center"} justify={"center"} gap={16}>
            <Upload className="w-fit"></Upload>
          </Flex>

          <Flex align={"center"} justify={"center"} gap={16}>
            <Upload className="w-fit">
              <Flex direction={"column"} gap={4} align={"center"}>
                <UploadIcon className="size-[1.5rem] text-primary" />
                <Text className="text-primary">Tải file</Text>
              </Flex>
            </Upload>
          </Flex>
        </Card>
      </div>
    </div>
  );
};
