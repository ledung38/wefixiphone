"use client";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Text,
} from "@/components/ui";
import { MoreVertical } from "lucide-react";
import React from "react";

export const MenuComponent = () => {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showLineNumbers, setShowLineNumbers] = React.useState(false);
  const [position, setPosition] = React.useState("bottom");

  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Menu</Text>
      <Text size={"medium"} as="p" className="mt-5">
        A versatile menu for navigation.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5" className=" block">
          Basic Menu
        </Text>
      </div>

      <div className="mt-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Actions <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" sideOffset={6}>
            <DropdownMenuLabel>Tuỳ chọn nhanh</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => alert("Xem chi tiết")}>
              Xem chi tiết
              <DropdownMenuShortcut>Ctrl+O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Chỉnh sửa")}>
              Chỉnh sửa
              <DropdownMenuShortcut>Ctrl+E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => alert("Xóa item")}
            >
              Xóa
              <DropdownMenuShortcut>Del</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Hiển thị status bar
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={showLineNumbers}
              onCheckedChange={setShowLineNumbers}
            >
              Hiển thị số dòng
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Vị trí hiển thị</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">
                    Phía trên
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Phía dưới
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    Bên phải
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
