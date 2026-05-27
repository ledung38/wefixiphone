"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Text,
} from "@/components/ui";
import { RHFDatePicker, RHFDateRangePicker } from "@/components/ui/DatePicker";
import Flex from "@/components/ui/Flex";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";

import { date, z } from "zod";

export const informationPrintFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .nonempty({
      message: "Họ và tên không được để trống.",
    })
    .min(6, {
      message: "Họ và tên cần có ít nhất 6 ký tự.",
    }),
  phone: z
    .string()
    .trim()
    .nonempty({
      message: "Họ và tên không được để trống.",
    })
    .regex(/^\d+$/, {
      message: "Số điện thoại chỉ được chứa số.",
    })
    .min(8, {
      message: "Số điện thoại cần có ít nhất 8 số.",
    })
    .max(13, {
      message: "Số điện thoại không được vượt quá 13 số.",
    }),
  email: z
    .string()
    .trim()
    .nonempty({
      message: "Email không được để trống.",
    })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email không đúng định dạng.",
    }),
  address: z.string().trim().nonempty({
    message: "Địa chỉ không được để trống.",
  }),
  date: z.date({
    error: (issue) =>
      issue.input === undefined
        ? "Ngày sinh nhật không được để trống"
        : "Ngày không hợp lệ",
  }),
  range: z.object(
    {
      from: z.date({
        error: (issue) =>
          issue.input === undefined
            ? "Ngày bắt đầu không được để trống"
            : "Ngày bắt đầu không hợp lệ",
      }),
      to: z.date({
        error: (issue) =>
          issue.input === undefined
            ? "Ngày kết thúc không được để trống"
            : "Ngày kết thúc không hợp lệ",
      }),
    },
    {
      error: "Chọn đủ khoảng ngày",
    },
  ),
});

export type TInformationPrintForm = z.infer<typeof informationPrintFormSchema>;

export const FormComponent = () => {
  const form = useForm<any>({
    resolver: zodResolver(informationPrintFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      date: undefined as unknown as Date,
      range: undefined as unknown as DateRange,
    },
    reValidateMode: "onChange",
  });

  function onSubmit(values: TInformationPrintForm) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Form</Text>
      <Text size={"medium"} as="p" className="mt-5">
        High-performance form component with data domain management. Includes
        data entry, validation, and corresponding styles.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5" className="mb-5 block">
          Form Basic
        </Text>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên *</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg shadow-none ring-transparent"
                        placeholder="Nhập họ và tên đầy đủ"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại *</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg shadow-none ring-transparent"
                        placeholder="Nhập số điện thoại"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg shadow-none ring-transparent"
                        placeholder="Nhập email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ *</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg shadow-none ring-transparent"
                        placeholder="Nhập địa chỉ cụ thể "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-4">
                <RHFDatePicker
                  name="date"
                  label="Ngày sinh nhật"
                  placeholder="dd/mm/yyyy"
                  min={new Date(2000, 0, 1)}
                  max={new Date(2100, 11, 31)}
                  formatString="dd/MM/yyyy"
                  clearable
                />
              </div>

              <RHFDateRangePicker
                name="range"
                label="Khoảng ngày hoạt động"
                placeholder="Chọn khoảng ngày"
                formatString="dd/MM/yyyy"
                clearable
              />

              <Flex justify={"flex-end"}>
                <Button className="mt-5 " type="submit">
                  Submit
                </Button>
              </Flex>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
