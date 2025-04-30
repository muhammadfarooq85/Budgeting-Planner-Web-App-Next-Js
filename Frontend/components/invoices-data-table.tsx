"use client";
// Libraries Imports
import * as React from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconDownload,
  IconGripVertical,
  IconPlus,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { z } from "zod";
// Local Imports
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import InvoiceModal from "@/components/invoice-modal";
import { convertDateToLocalFormat } from "@/helpers/helpers";
import { InvoiceFormTypes, InvoiceItem } from "@/types/types";
import { invoiceSchema } from "@/schema/schema";
import { FormikErrors, useFormik } from "formik";
import { invoiceStatusTypes } from "@/constants/constants";

export const schema = z.object({
  _id: z.string(),
  invoiceNumber: z.string(),
  issueDate: z.string(),
  updatedAt: z.string(),
  dueDate: z.string(),
  amount: z.number(),
  status: z.string(),
  description: z.string(),
  purposeOfInvoice: z.string(),
  senderDetails: z.object({
    name: z.string(),
    email: z.string(),
    bankName: z.string(),
    accountNumber: z.string(),
    address: z.string(),
  }),
  receiverDetails: z.object({
    name: z.string(),
    email: z.string(),
    bankName: z.string(),
    accountNumber: z.string(),
    address: z.string(),
  }),
  items: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      quantity: z.number(),
      pricePerUnit: z.number(),
    })
  ),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      id="drag"
      name="drag"
      type="button"
      aria-label="Drag"
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// Table Columns
const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original._id} />,
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Nr.",
    cell: ({ row }) => {
      return <p>{row.original.invoiceNumber}</p>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => {
      return <p>{convertDateToLocalFormat(row.original.issueDate, "en-PK")}</p>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <p>{convertDateToLocalFormat(row.original.dueDate, "en-PK")}</p>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <p>{row.original.amount}</p>,
  },
  {
    accessorKey: "senderDetails.name",
    header: "Sender",
    cell: ({ row }) => <p>{row.original.senderDetails.name}</p>,
  },
  {
    accessorKey: "receiverDetails.name",
    header: "Receiver",
    cell: ({ row }) => <p>{row.original.receiverDetails.name}</p>,
  },
  {
    accessorKey: "purposeOfInvoice",
    header: "Purpose Of Invoice",
    cell: ({ row }) => (
      <p>{row.original.purposeOfInvoice.slice(0, 10) + "... "}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColor: { [key: string]: string } = {
        paid: "!bg-green-500",
        unpaid: "!bg-red-500",
        pending: "!bg-yellow-500",
        draft: "!bg-gray-500",
        overDue: "!bg-orange-500",
      };

      return (
        <Badge className={`${statusColor[row.original.status.toLowerCase()]}`}>
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    header: "Download",
    cell: ({ row }) => (
      <Button
        id="downlaodInvoice"
        name="downlaodInvoice"
        aria-label="Downlaod Invoice"
        type="button"
        variant="outline"
        className="cursor-pointer"
        size="icon"
      >
        <IconDownload />
        <span className="sr-only">Downlaod Invoice</span>
      </Button>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = React.useState(false);
      const handleEditDrawer = () => {
        setIsOpen(!isOpen);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              id="openMenu"
              name="openMenu"
              aria-label="Open Menu"
              type="button"
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={handleEditDrawer}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
          <TableCellViewer
            item={row.original}
            open={isOpen}
            onChangeOpen={setIsOpen}
          />
        </DropdownMenu>
      );
    },
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original._id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function InvoicesDataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [isOpen, setIsOpen] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ _id }) => _id) || [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row._id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  const handleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          Filter
        </Label>
        <Select>
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="supplier">Supplier</SelectItem>
            <SelectItem value="stock">Stock</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
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
          <Button
            id="addInvoice"
            name="addInvoice"
            type="button"
            aria-label="Add Invoice"
            variant="outline"
            size="sm"
            onClick={handleDialog}
            className="!bg-[#d7e6c5] cursor-pointer  !text-lg !font-bold"
          >
            <IconPlus />
            <span className="hidden lg:inline">Add Invoice</span>
          </Button>
          <InvoiceModal isOpen={isOpen} setIsOpen={handleDialog} />
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
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
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
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
          </DndContext>
        </div>
        <div className="flex justify-end px-4">
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function TableCellViewer({
  item,
  open,
  onChangeOpen,
}: {
  item: z.infer<typeof schema>;
  open?: boolean;
  onChangeOpen?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();

  const {
    errors,
    values,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleReset,
    setFieldValue,
    isSubmitting,
  } = useFormik<InvoiceFormTypes>({
    validationSchema: invoiceSchema,
    initialValues: {
      issueDate: item.issueDate.slice(0, 10),
      dueDate: item.dueDate.slice(0, 10),
      description: item.description,
      purposeOfInvoice: item.purposeOfInvoice,
      status: item.status,
      senderDetails: {
        name: item.senderDetails.name,
        accountNumber: item.senderDetails.accountNumber,
        email: item.senderDetails.email,
        bankName: item.senderDetails.bankName,
        address: item.senderDetails.address,
      },
      receiverDetails: {
        name: item.senderDetails.name,
        accountNumber: item.senderDetails.accountNumber,
        email: item.senderDetails.email,
        bankName: item.senderDetails.bankName,
        address: item.senderDetails.address,
      },
      items: item.items.map((it) => ({
        name: it.name,
        quantity: it.quantity,
        pricePerUnit: it.pricePerUnit,
      })),
    },
    onSubmit(values) {
      console.log("Form Values", values);
      handleReset(values);
    },
  });

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={onChangeOpen}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle className="text-lg">{`INV-${item.invoiceNumber}`}</DrawerTitle>
          <DrawerDescription>
            {`Please edit the details for INV-${item.invoiceNumber}.`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="issueDate"
                className="!text-lg mb-1 font-semibold"
              >
                Issue Date:
              </Label>
              <Input
                id="issueDate"
                name="issueDate"
                type="date"
                placeholder="Please select an issue date."
                aria-label="Issue Date"
                value={values.issueDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && touched.issueDate ? (
                <p className="text-red-500 text-md">{errors.issueDate}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="dueDate" className="!text-lg mb-1 font-semibold">
                Due Date:
              </Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                placeholder="Please select an due date."
                aria-label="Issue Date"
                value={values.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && touched.dueDate ? (
                <p className="text-red-500 text-md">{errors.dueDate}</p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="description"
                className="!text-lg mb-1 font-semibold"
              >
                Invoice Description:
              </Label>
              <Input
                id="description"
                name="description"
                type="text"
                aria-label="Transaction Description"
                placeholder="Please enter a description."
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.description ? (
                <p className="text-red-500 text-md">{errors.description}</p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="purposeOfTransaction"
                className="!text-lg mb-1 font-semibold"
              >
                Purpose of Invoice:
              </Label>
              <Input
                id="purposeOfTransaction"
                name="purposeOfTransaction"
                type="text"
                aria-label="Purpose Of Transaction"
                placeholder="Please enter a purpose of transaction."
                value={values.purposeOfInvoice}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.purposeOfInvoice ? (
                <p className="text-red-500 text-md">
                  {errors.purposeOfInvoice}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="senderDetails.name"
                className="!text-lg mb-1 font-semibold"
              >
                Sender Name:
              </Label>
              <Input
                id="senderDetails.name"
                name="senderDetails.name"
                type="text"
                aria-label="Sender Name"
                placeholder="Please enter a sender name."
                value={values.senderDetails.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.senderDetails?.name ? (
                <p className="text-red-500 text-md">
                  {errors.senderDetails?.name}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="senderDetails.bankName"
                className="!text-lg mb-1 font-semibold"
              >
                Sender Bank Name:
              </Label>
              <Input
                id="senderDetails.bankName"
                name="senderDetails.bankName"
                type="text"
                aria-label="Sender Bank Name"
                placeholder="Please enter a sender bank name."
                value={values.senderDetails.bankName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.senderDetails?.bankName ? (
                <p className="text-red-500 text-md">
                  {errors.senderDetails?.bankName}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="senderDetails.accountNumber"
                className="!text-lg mb-1 font-semibold"
              >
                Sender Account Number:
              </Label>
              <Input
                id="senderDetails.accountNumber"
                name="senderDetails.accountNumber"
                type="text"
                aria-label="Sender Account Number"
                placeholder="Please enter a sender account number."
                value={values.senderDetails.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.senderDetails?.accountNumber ? (
                <p className="text-red-500 text-md">
                  {errors.senderDetails?.accountNumber}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="senderDetails.email"
                className="!text-lg mb-1 font-semibold"
              >
                Sender Email:
              </Label>
              <Input
                id="senderDetails.email"
                name="senderDetails.email"
                type="email"
                aria-label="Sender Email"
                placeholder="Please enter a sender email."
                value={values.senderDetails.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.senderDetails?.email ? (
                <p className="text-red-500 text-md">
                  {errors.senderDetails?.email}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="senderDetails.address"
                className="!text-lg mb-1 font-semibold"
              >
                Sender Address:
              </Label>
              <Input
                id="senderDetails.address"
                name="senderDetails.address"
                type="text"
                aria-label="Sender Email"
                placeholder="Please enter a sender address."
                value={values.senderDetails.address}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.senderDetails?.address ? (
                <p className="text-red-500 text-md">
                  {errors.senderDetails?.address}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="receiverDetails.name"
                className="!text-lg mb-1 font-semibold"
              >
                Receiver Name:
              </Label>
              <Input
                id="receiverDetails.name"
                name="receiverDetails.name"
                type="text"
                aria-label="Receiver Name"
                placeholder="Please enter a receiver name."
                value={values.receiverDetails.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.receiverDetails?.name ? (
                <p className="text-red-500 text-md">
                  {errors.receiverDetails?.name}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="receiverDetails.bankName"
                className="!text-lg mb-1 font-semibold"
              >
                Receiver Bank Name:
              </Label>
              <Input
                id="receiverDetails.bankName"
                name="receiverDetails.bankName"
                type="text"
                aria-label="Receiver Bank Name"
                placeholder="Please enter a receiver bank name."
                value={values.receiverDetails.bankName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.receiverDetails?.bankName ? (
                <p className="text-red-500 text-md">
                  {errors.receiverDetails?.bankName}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="receiverDetails.accountNumber"
                className="!text-lg mb-1 font-semibold"
              >
                Receiver Account Number:
              </Label>
              <Input
                id="receiverDetails.accountNumber"
                name="receiverDetails.accountNumber"
                type="text"
                aria-label="Receiver Account Number"
                placeholder="Please enter a receiver account number."
                value={values.receiverDetails.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.receiverDetails?.accountNumber ? (
                <p className="text-red-500 text-md">
                  {errors.receiverDetails?.accountNumber}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="receiverDetails.email"
                className="!text-lg mb-1 font-semibold"
              >
                Receiver Email:
              </Label>
              <Input
                id="receiverDetails.email"
                name="receiverDetails.email"
                type="email"
                aria-label="Receiver Email"
                placeholder="Please enter a receiver account email."
                value={values.receiverDetails.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.receiverDetails?.email ? (
                <p className="text-red-500 text-md">
                  {errors.receiverDetails?.email}
                </p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="receiverDetails.address"
                className="!text-lg mb-1 font-semibold"
              >
                Receiver Address:
              </Label>
              <Input
                id="receiverDetails.address"
                name="receiverDetails.address"
                type="text"
                aria-label="Receiver Email"
                placeholder="Please enter a receiver account address."
                value={values.receiverDetails.address}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched.receiverDetails?.address ? (
                <p className="text-red-500 text-md">
                  {errors.receiverDetails?.address}
                </p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="type" className="!text-lg mb-1 font-semibold">
                Invoice Status:
              </Label>
              <Select
                name="status"
                value={values.status}
                onValueChange={(value) => setFieldValue("status", value)}
                required
              >
                <SelectTrigger className="!w-full !py-5" size="sm">
                  <SelectValue placeholder="Select invoice status type." />
                </SelectTrigger>
                <SelectContent>
                  {invoiceStatusTypes?.map((type) => (
                    <SelectItem value={type.toLowerCase()} key={type}>
                      {type.slice(0, 1).toUpperCase() +
                        type.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors && touched.status ? (
                <p className="text-red-500 text-md">{errors.status}</p>
              ) : null}
            </div>
            {values.items?.map((singleItem, index) => (
              <div key={singleItem.name} className="flex flex-col gap-4">
                <div>
                  <Label
                    htmlFor={`${singleItem.name}-name`}
                    className="!text-lg mb-1 font-semibold"
                  >
                    Item Name:
                  </Label>
                  <Input
                    id={`${singleItem.name}-name`}
                    name={`items[${index}].name`}
                    type="text"
                    aria-label="Item Name"
                    placeholder="Please enter an item name."
                    value={values.items[index].name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {Array.isArray(errors.items) &&
                    Array.isArray(touched.items) &&
                    touched.items[index]?.name &&
                    typeof errors.items[index] === "object" &&
                    errors.items[index]?.name && (
                      <p className="text-red-500 text-sm">
                        {errors.items[index].name as string}
                      </p>
                    )}
                </div>
                <div>
                  <Label
                    htmlFor={`${singleItem.name}-quantity`}
                    className="!text-lg mb-1 font-semibold"
                  >
                    Item Quantity:
                  </Label>
                  <Input
                    id={`${singleItem.name}-quantity`}
                    name={`items[${index}].quantity`}
                    type="number"
                    aria-label="Item Quantity"
                    placeholder="Please enter an item quantity."
                    value={values.items[index].quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {Array.isArray(errors.items) &&
                    Array.isArray(touched.items) &&
                    touched.items[index]?.quantity &&
                    typeof errors.items[index] === "object" &&
                    errors.items[index]?.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.items[index].quantity as string}
                      </p>
                    )}
                </div>
                <div>
                  <Label
                    htmlFor={`${singleItem.name}-pricePerUnit`}
                    className="!text-lg mb-1 font-semibold"
                  >
                    Item Price Per Unit:
                  </Label>
                  <Input
                    id={`${singleItem.name}-pricePerUnit`}
                    name={`items[${index}].pricePerUnit`}
                    type="number"
                    aria-label="Item Price Per Unit"
                    placeholder="Please enter an item price per unit."
                    value={values.items[index].pricePerUnit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {Array.isArray(errors.items) &&
                    Array.isArray(touched.items) &&
                    touched.items[index]?.pricePerUnit &&
                    typeof errors.items[index] === "object" &&
                    errors.items[index]?.pricePerUnit && (
                      <p className="text-red-500 text-sm">
                        {errors.items[index].pricePerUnit as string}
                      </p>
                    )}
                </div>
              </div>
            ))}
            <Button
              className="!bg-[#d7e6c5] !text-black cursor-pointer !text-lg !font-bold"
              id="save"
              name="save"
              type="submit"
              aria-label="Save"
            >
              {isSubmitting ? " ... " : "Save"}
            </Button>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              id="done"
              name="done"
              type="button"
              aria-label="Done"
              className="!bg-red-200 !text-black cursor-pointer !text-lg !font-bold"
              variant="outline"
            >
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
