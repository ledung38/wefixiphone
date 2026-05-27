"use client";
import { Text } from "@/components/ui";
import DataTable from "@/components/ui/DataTable";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Person = {
  id: number;
  name: string;
  age: number;
  email: string;
  birthday: string;
  isActive: boolean;
};

const defaultData: Person[] = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    email: "alice@test.com",
    birthday: "1998-05-12",
    isActive: true,
  },
  {
    id: 2,
    name: "Bob",
    age: 30,
    email: "bob@test.com",
    birthday: "1993-01-20",
    isActive: false,
  },
  {
    id: 3,
    name: "Charlie",
    age: 22,
    email: "charlie@test.com",
    birthday: "2001-08-10",
    isActive: true,
  },
  {
    id: 4,
    name: "David",
    age: 35,
    email: "david@test.com",
    birthday: "1988-12-01",
    isActive: false,
  },
];
export const TableComponent = () => {
  const getCellClassName = (cell: any) => {
    if (cell.row.index === 0) {
      return "text-center";
    }
    return "text-center";
  };

  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
      meta: {
        className: "hidden md:table-cell w-[4%]",
        getCellClassName,
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      meta: {
        className: "hidden md:table-cell w-[4%]",
        getCellClassName,
      },
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: (info) => <span>{info.getValue() as any} tuổi</span>,
      meta: {
        className: "hidden md:table-cell w-[4%]",
        getCellClassName,
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: {
        className: "hidden md:table-cell w-[4%]",
        getCellClassName,
      },
    },
    {
      accessorKey: "birthday",
      header: "Birthday",
      cell: (info) => (
        <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>
      ),
      meta: {
        className: "hidden md:table-cell w-[4%]",
        getCellClassName,
      },
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: (info) =>
        info.getValue() ? (
          <span style={{ color: "green" }}>Yes</span>
        ) : (
          <span style={{ color: "red" }}>No</span>
        ),
      meta: {
        className: "hidden md:table-cell w-[4%]",
        getCellClassName,
      },
    },
  ];

  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-2 w-[800px] mx-auto">
      <Text variant="h1">Table</Text>
      <Text size={"medium"} as="p" className="mt-5">
        A table displays rows of data.
      </Text>

      <Text variant="h3" className="block mt-5">
        Example
      </Text>

      <div className="mt-5">
        <Text variant="h5" className="mb-5 block">
          Basic Table
        </Text>
        <DataTable table={table} columns={columns} />
      </div>
    </div>
  );
};
