"use client";
import { Card, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";
import { AutoComplete } from "@/components/ui/Select/autocomplete";
import { Select } from "@/components/ui/Select/index";
import React, { useState } from "react";

export const SelectComponent = () => {
  const [valueClear, setValueClear] = useState("1");
  const [autocomplete, setAutocomplete] = useState({
    value: "1",
    label: "Item 1",
  });

  const optionAutocomplete = [
    {
      value: "1",
      label: "Item 1",
    },
    {
      value: "2",
      label: "Item 2",
    },
    {
      value: "3",
      label: "Item 3",
    },
    {
      value: "4",
      label: "Item 4",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Select</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Select components are used for collecting user provided information from
        a list of options.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div>
        <Text variant="h5">Basic Usage</Text>
        <Text className="block">
          Select are positioned under their emitting elements, unless they are
          close to the bottom of the viewport.
        </Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Select
              id="input-select"
              placeholder="Chọn"
              value={"1"}
              options={[
                {
                  value: "1",
                  label: "Item 1",
                },
                {
                  value: "2",
                  label: "Item 2",
                },
                {
                  value: "3",
                  label: "Item 3",
                },
                {
                  value: "4",
                  label: "Item 4",
                  disabled: true,
                },
              ]}
            />

            <Select
              id="input-select"
              placeholder="Chọn"
              value={"1"}
              disabled
              options={[]}
            />

            <Select
              id="input-select"
              placeholder="Chọn"
              value={"1"}
              isLoading
              options={[
                {
                  value: "1",
                  label: "Item 1",
                },
              ]}
            />

            <Select
              id="input-select"
              placeholder="Chọn"
              allowClear
              value={valueClear}
              onChange={(value) => setValueClear(value)}
              size="md"
              options={[
                {
                  value: "1",
                  label: "Item 1",
                },
                {
                  value: "2",
                  label: "Item 2",
                },
                {
                  value: "3",
                  label: "Item 3",
                },
                {
                  value: "4",
                  label: "Item 4",
                  disabled: true,
                },
              ]}
            />
          </Flex>
        </Card>
      </div>

      <div>
        <Text variant="h5">Sizes</Text>
        <Text className="block">
          The height of the input field for the select defaults to 36px. If size
          is set to md, the height will be 40px, and if set to lg, 48px.
        </Text>
        <Card className="border rounded-4xl flex mt-5 " padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <Select
              id="input-select"
              placeholder="Chọn"
              value={"1"}
              options={[
                {
                  value: "1",
                  label: "Item 1",
                },
              ]}
            />
            <Select
              id="input-select"
              placeholder="Chọn"
              value={"1"}
              size="md"
              options={[
                {
                  value: "1",
                  label: "Item 1",
                },
              ]}
            />
            <Select
              id="input-select"
              placeholder="Chọn"
              value={"1"}
              size="lg"
              options={[
                {
                  value: "1",
                  label: "Item 1",
                },
              ]}
            />
          </Flex>
        </Card>
      </div>

      <div>
        <Text variant="h5">AutoComplete</Text>
        <Text className="block">The AutoComplete</Text>
        <Card className="border rounded-4xl flex mt-5 h-50" padding="24px">
          <Flex align={"center"} justify={"center"} gap={16}>
            <AutoComplete
              options={optionAutocomplete}
              emptyMessage="Không tìm thấy kết quả"
              placeholder="Tìm kiếm kết quả"
              // isLoading
              onValueChange={(value) => {
                console.log("value", value);
                setAutocomplete(value);
              }}
              value={autocomplete}
            />
          </Flex>
        </Card>
      </div>
    </div>
  );
};
