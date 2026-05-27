"use client";
import { Col, Row, Slider, Text } from "@/components/ui";
import React from "react";

export const SliderComponent = () => {
  const [value, setValue] = React.useState<number[]>([30, 70]);
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Slider</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Provides user selection from a range of values.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5">Basic Slider</Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12}>
            <label className="text-sm text-gray-600">
              Khoảng giá: <b>{value[0]}</b> – <b>{value[1]}</b>
            </label>

            <Slider
              min={0}
              max={100}
              step={1}
              value={value}
              onValueChange={setValue}
              className="mt-2"
            />
          </Col>
          <Col span={12}>
            <label className="text-sm text-gray-600">
              Âm lượng: <b>{value[1]}%</b>
            </label>

            <Slider
              min={0}
              max={100}
              step={1}
              value={[value[1]]}
              onValueChange={(v) => setValue([value[0], v[0]])}
              className="mt-2"
            />
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <Text variant="h5">Color Slider</Text>
        <Text as="p" className="mt-2">
          You can choose the color of the slider using the color prop of the
          Slider component to change the color of the slider. With option:
          <span className="text-primary">
            default, primary, secondary, success, warning, info, error
          </span>
        </Text>
        <Row cols={24} gutter={"lg"} className="mt-5">
          <Col span={12}>
            <div className="flex gap-5 flex-col ">
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                defaultValue={[30, 70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="secondary"
                defaultValue={[30, 70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="success"
                defaultValue={[30, 70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="warning"
                defaultValue={[30, 70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="info"
                defaultValue={[30, 70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="error"
                defaultValue={[30, 70]}
              />
            </div>
          </Col>

          <Col span={12}>
            <div className="flex gap-5 flex-col ">
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                defaultValue={[70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="secondary"
                defaultValue={[70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="success"
                defaultValue={[70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="warning"
                defaultValue={[70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="info"
                defaultValue={[70]}
              />
              <Slider
                min={0}
                max={100}
                step={1}
                className="mt-2"
                color="error"
                defaultValue={[70]}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
