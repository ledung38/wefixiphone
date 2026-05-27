"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@/components/ui";
import RoundedTab from "@/components/ui/RoundedTab";

export const TabsComponent = () => {
  const items = [
    {
      value: "tab1",
      label: "Tab 1",
    },
    {
      value: "tab2",
      label: "Tab 2",
    },
    {
      value: "tab3",
      label: "Tab 3",
    },
  ];
  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Tabs</Text>
      <Text size={"medium"} as="p" className="mt-5">
        Tabs make it easy to explore and switch between different views.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5">Basic Tabs</Text>
        <div className="p-6">
          <Tabs className="px-0 sm:mt-2" defaultValue="tab1">
            <div className="flex w-full border-b border-[#CDCDCD]">
              <TabsList className="pb-0 pl-0">
                {items.map((item, index) => (
                  <TabsTrigger
                    value={item.value}
                    key={item.value}
                    className={`pb-2 px-2 ${index === 0 ? "ml-0" : ""} `}
                  >
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {items.map((item) => (
              <TabsContent key={item.value} value={item.value}>
                {item.label}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div className="mt-5">
        <Text variant="h5">Rounded Tabs</Text>
        <div className="p-6">
          <RoundedTab items={items} defaultActiveItem="tab1">
            {items.map((item) => (
              <TabsContent key={item.value} value={item.value}>
                {item.label}
              </TabsContent>
            ))}
          </RoundedTab>
        </div>
      </div>
    </div>
  );
};
