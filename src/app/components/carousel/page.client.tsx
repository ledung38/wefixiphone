"use client";
import {
  Button,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Col,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Row,
  Text,
} from "@/components/ui";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const CarouselComponent = ({ data = Array.from({ length: 10 }) }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(1);
  const totalSlides = data.length; // Total number of slides
  const slidesPerGroup = totalSlides >= 3 ? 3 : totalSlides; // Number of slides per pagination item

  const totalGroups = Math.ceil(totalSlides / slidesPerGroup);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Carousel</Text>
      <Text size={"medium"} as="p" className="mt-5">
        A set of carousel areas.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Row cols={24} gutter={"lg"} className="mt-5" align={"middle"}>
          <Col span={24}>
            <div className="h-full w-full flex-1 xl:w-[unset]">
              <Carousel
                setApi={setApi}
                className="h-full w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent
                  className="-ml-4 h-full"
                  containerClassName="h-full"
                >
                  {data?.map((key, index) => (
                    <CarouselItem key={index} className="h-full pl-4">
                      <div className="h-full rounded-2xl border border-white bg-primary/20 p-6 backdrop-blur-sm">
                        <h3 className="text-[17px] leading-[25px] font-bold text-primary-foreground">
                          Item {index + 1}
                        </h3>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          color="primary"
                          className="mt-4"
                        >
                          Xem thêm
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -translate-x-1/2 border-white bg-accent">
                  <ArrowLeftIcon />
                </CarouselPrevious>
                <CarouselNext className="right-0 translate-x-1/2 border-white bg-accent">
                  <ArrowRightIcon />
                </CarouselNext>
              </Carousel>
            </div>

            <div className="mt-5">
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: totalGroups }).map((_, groupIndex) => {
                    // Calculate the first slide index in this group
                    const firstSlideInGroup = groupIndex * slidesPerGroup;
                    // Check if current slide is in this group
                    const isActiveGroup =
                      current >= firstSlideInGroup &&
                      current < firstSlideInGroup + slidesPerGroup;

                    return (
                      <PaginationItem key={groupIndex}>
                        <PaginationLink
                          isActive={isActiveGroup}
                          onClick={() => {
                            api?.scrollTo(firstSlideInGroup);
                          }}
                          className={`inline-block h-2 w-2 rounded-full ${
                            isActiveGroup ? "bg-primary" : "bg-border"
                          }`}
                        />
                      </PaginationItem>
                    );
                  })}
                </PaginationContent>
              </Pagination>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
