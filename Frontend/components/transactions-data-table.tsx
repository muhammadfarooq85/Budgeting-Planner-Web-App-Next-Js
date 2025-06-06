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
  IconMinus,
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
import { useFormik } from "formik";
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
import IncomeEpenseModal from "@/components/income-epense-modal";
import { convertDateToLocalFormat } from "@/helpers/helpers";
import { transactionsTypes } from "@/constants/constants";
import { transactionSchema } from "@/schema/schema";
import { TransactionFormTypes } from "@/types/types";

export const schema = z.object({
  _id: z.string(),
  transactionNumber: z.string(),
  issueDate: z.string(),
  updatedAt: z.string(),
  amount: z.number(),
  description: z.string(),
  purposeOfTransaction: z.string(),
  type: z.string(),
  userId: z.string(),
  senderDetails: z.object({
    name: z.string(),
    accountNumber: z.string(),
    bankName: z.string(),
    email: z.string(),
    address: z.string(),
  }),
  receiverDetails: z.object({
    name: z.string(),
    accountNumber: z.string(),
    bankName: z.string(),
    email: z.string(),
    address: z.string(),
  }),
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
    cell: ({ row }) => <DragHandle id={row.original?._id} />,
  },
  {
    accessorKey: "transactionNumber",
    header: "Transaction Nr.",
    cell: ({ row }) => {
      return <p>{row.original?.transactionNumber}</p>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => {
      return (
        <p>{convertDateToLocalFormat(row.original?.issueDate, "en-PK")}</p>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <p>{row.original?.amount}</p>,
  },
  {
    accessorKey: "senderDetails.name",
    header: "Sender",
    cell: ({ row }) => <p>{row.original.senderDetails?.name}</p>,
  },
  {
    accessorKey: "receiverDetails.name",
    header: "Receiver",
    cell: ({ row }) => <p>{row.original.receiverDetails?.name}</p>,
  },
  {
    accessorKey: "purposeOfTransaction",
    header: "Purpose of Transaction",
    cell: ({ row }) => (
      <p>{row.original?.purposeOfTransaction.slice(0, 10) + "... "}</p>
    ),
  },
  {
    accessorKey: "type",
    header: "Transaction Type",
    cell: ({ row }) => {
      const isIncome = row.original.type?.toLowerCase() === "income";
      return (
        <Badge className={`${isIncome ? "!bg-green-600" : "!bg-red-600"}`}>
          {row.original?.type}
        </Badge>
      );
    },
  },
  {
    header: "Dwonlaod",
    cell: ({ row }) => (
      <Button
        id="downlaodTransaction"
        name="downlaodTransaction"
        type="button"
        aria-label="Downlaod Transaction"
        variant="outline"
        className="cursor-pointer"
        size="icon"
      >
        <IconDownload />
        <span className="sr-only">Downlaod Transaction</span>
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
              type="button"
              aria-label="Open menu"
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
    id: row.original?._id,
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

export function TransactionsDataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDialogtitle, setIsDialogTitle] = React.useState("");
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
    getRowId: (row) => row?._id.toString(),
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

  const handleDialog = (title: string) => {
    setIsOpen(!isOpen);
    setIsDialogTitle(title);
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
            id="addIncome"
            name="addIncome"
            type="button"
            aria-label="Add Income"
            variant="outline"
            size="sm"
            onClick={() => handleDialog("Income")}
            className="!bg-[#d7e6c5] cursor-pointer !text-lg !font-bold"
          >
            <IconPlus />
            <span className="hidden lg:inline">Add Income</span>
          </Button>
          <Button
            id="addExpense"
            name="addExpense"
            type="button"
            aria-label="Add Expense"
            variant="outline"
            size="sm"
            onClick={() => handleDialog("Expense")}
            className="!bg-red-200 cursor-pointer !text-lg !font-bold"
          >
            <IconMinus />
            <span className="hidden lg:inline">Add Expense</span>
          </Button>
          <IncomeEpenseModal
            isOpen={isOpen}
            setIsOpen={handleDialog}
            dialogtitle={isDialogtitle}
          />
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
                id="firstPage"
                name="firstPage"
                type="button"
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                id="previousPage"
                name="previousPage"
                type="button"
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
                id="nextPage"
                name="nextPage"
                type="button"
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
                id="lastPage"
                name="lastPage"
                type="button"
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
  } = useFormik<TransactionFormTypes>({
    validationSchema: transactionSchema,
    initialValues: {
      purposeOfTransaction: item?.purposeOfTransaction,
      type: item?.type,
      description: item?.description,
      issueDate: item?.issueDate.slice(0, 10),
      amount: item?.amount,
      senderDetails: {
        name: item?.senderDetails.name,
        accountNumber: item?.senderDetails.accountNumber,
        email: item?.senderDetails?.email,
        bankName: item?.senderDetails?.bankName,
        address: item?.senderDetails?.address,
      },
      receiverDetails: {
        name: item?.senderDetails?.name,
        accountNumber: item?.senderDetails?.accountNumber,
        email: item?.senderDetails?.email,
        bankName: item?.senderDetails?.bankName,
        address: item?.senderDetails?.address,
      },
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
          <DrawerTitle className="text-lg">{`TXN-${item?.transactionNumber}`}</DrawerTitle>
          <DrawerDescription>
            {`Please edit the details for TXN-${item?.transactionNumber}.`}
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
                value={values?.issueDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && touched?.issueDate ? (
                <p className="text-red-500 text-md">{errors?.issueDate}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="amount" className="!text-lg mb-1 font-semibold">
                Amount:
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                aria-label="Amount"
                placeholder="Please select an amount."
                value={values?.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.amount ? (
                <p className="text-red-500 text-md">{errors?.amount}</p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="description"
                className="!text-lg mb-1 font-semibold"
              >
                Transaction Description:
              </Label>
              <Input
                id="description"
                name="description"
                type="text"
                aria-label="Transaction Description"
                placeholder="Please enter a description."
                value={values?.description}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.description ? (
                <p className="text-red-500 text-md">{errors?.description}</p>
              ) : null}
            </div>
            <div>
              <Label
                htmlFor="purposeOfTransaction"
                className="!text-lg mb-1 font-semibold"
              >
                Transaction Description:
              </Label>
              <Input
                id="purposeOfTransaction"
                name="purposeOfTransaction"
                type="text"
                aria-label="Purpose Of Transaction"
                placeholder="Please enter a purpose of transaction."
                value={values?.purposeOfTransaction}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.purposeOfTransaction ? (
                <p className="text-red-500 text-md">
                  {errors?.purposeOfTransaction}
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
                value={values?.senderDetails.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.senderDetails?.name ? (
                <p className="text-red-500 text-md">
                  {errors?.senderDetails?.name}
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
                value={values?.senderDetails.bankName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.senderDetails?.bankName ? (
                <p className="text-red-500 text-md">
                  {errors?.senderDetails?.bankName}
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
                value={values?.senderDetails?.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.senderDetails?.accountNumber ? (
                <p className="text-red-500 text-md">
                  {errors?.senderDetails?.accountNumber}
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
                value={values?.senderDetails?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.senderDetails?.email ? (
                <p className="text-red-500 text-md">
                  {errors?.senderDetails?.email}
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
                aria-label="Sender Address"
                placeholder="Please enter a sender address."
                value={values?.senderDetails?.address}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.senderDetails?.address ? (
                <p className="text-red-500 text-md">
                  {errors?.senderDetails?.address}
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
                value={values?.receiverDetails?.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.receiverDetails?.name ? (
                <p className="text-red-500 text-md">
                  {errors?.receiverDetails?.name}
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
                value={values?.receiverDetails.bankName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.receiverDetails?.bankName ? (
                <p className="text-red-500 text-md">
                  {errors?.receiverDetails?.bankName}
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
                value={values?.receiverDetails.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.receiverDetails?.accountNumber ? (
                <p className="text-red-500 text-md">
                  {errors?.receiverDetails?.accountNumber}
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
                value={values?.receiverDetails.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.receiverDetails?.email ? (
                <p className="text-red-500 text-md">
                  {errors?.receiverDetails?.email}
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
                aria-label="Receiver Address"
                placeholder="Please enter a receiver account address."
                value={values?.receiverDetails.address}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors && touched?.receiverDetails?.address ? (
                <p className="text-red-500 text-md">
                  {errors?.receiverDetails?.address}
                </p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="type" className="!text-lg mb-1 font-semibold">
                Transation Type:
              </Label>
              <Select
                name="type"
                value={values?.type}
                onValueChange={(value) => setFieldValue("type", value)}
                required
              >
                <SelectTrigger className="!w-full !py-5" size="sm">
                  <SelectValue placeholder="Select transaction type." />
                </SelectTrigger>
                <SelectContent>
                  {transactionsTypes?.map((type) => (
                    <SelectItem value={type.toLowerCase()} key={type}>
                      {type.slice(0, 1).toUpperCase() +
                        type.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors && touched?.type ? (
                <p className="text-red-500 text-md">{errors?.type}</p>
              ) : null}
            </div>
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
