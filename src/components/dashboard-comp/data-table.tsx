"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DairyData = {
  "Approx. Total Revenue(INR)": number;
  Brand: string;
  Capacity_Utilization?: number;
  "Customer Location": string;
  Date: string;
  Date_Sell: string;
  Day: number;
  DayOfWeek: number;
  Days_to_Expire: number;
  Days_to_Sell: number;
  "Expiration Date": string;
  Expire: number;
  "Farm Size": string;
  Location: string;
  "Minimum Stock Threshold (liters/kg)": number;
  Month: number;
  "Number of Cows": number;
  "Price per Unit": number;
  "Price per Unit (sold)": number;
  "Product ID": number;
  "Product Name": string;
  "Production Date": string;
  "Quantity (liters/kg)": number;
  "Quantity Sold (liters/kg)": number;
  "Quantity in Stock (liters/kg)": number;
  Quantity_Lost: number;
  Quantity_Sold_Before_Expire: number;
  Quantity_Sold_Hist_Mean: number;
  Quarter: number;
  Real_Revenue: number;
  "Reorder Quantity (liters/kg)": number;
  Revenue_Before_Losses: number;
  "Sales Channel": string;
  Sales_Trend_7d?: number;
  Sales_Velocity: number;
  Sales_Velocity_Hist_Mean: number;
  Sales_Volatility_Hist: number;
  Seasonal_Volatility: number;
  "Shelf Life (days)": number;
  Stock_Efficiency: number;
  "Storage Condition": string;
  "Total Land Area (acres)": number;
  "Total Value": number;
  Value_Lost: number;
  Year: number;
};

export const columns: ColumnDef<DairyData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Date_Sell",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data da venda
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("Date_Sell"));
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="capitalize">{formattedDate}</div>;
    },
  },

  {
    accessorKey: "Product Name",
    header: "Product",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Product Name")}</div>
    ),
  },

  {
    accessorKey: "Quantity Sold (liters/kg)",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade Vendida (kg/lt)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("Quantity Sold (liters/kg)"));
      return (
        <div className="text-center font-medium">{quantity.toFixed(2)}</div>
      );
    },
  },
  {
    accessorKey: "Quantity_Lost",
    header: () => <div className="text-right">Quantidade Perdida (kg/lt)</div>,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("Quantity_Lost"));
      return (
        <div className="text-right font-medium ">{quantity.toFixed(2)}</div>
      );
    },
  },
  {
    accessorKey: "Price per Unit (sold)",
    header: () => <div className="text-right">Preço Unitário (venda)</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("Price per Unit (sold)"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Real_Revenue",
    header: () => <div className="text-right">Lucro</div>,
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("Real_Revenue"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
      }).format(revenue);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product["Product ID"].toString())
              }
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product details</DropdownMenuItem>
            <DropdownMenuItem>View sales history</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export interface DataTableDashProps {
  data: DairyData[];
}

export function DataTableDash({ data }: DataTableDashProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter products..."
          value={
            (table.getColumn("Product Name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("Product Name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
