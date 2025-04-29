import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { incomeExpenseSchema } from "@/schema/schmea";

export default function IncomeExpenseModal({
  isOpen,
  setIsOpen,
  dialogtitle,
}: {
  isOpen: boolean;
  setIsOpen: (title: string) => void;
  dialogtitle: string;
}) {
  const {
    errors,
    values,
    touched,
    handleSubmit,
    handleReset,
    handleBlur,
    handleChange,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      account: "",
      counterparty: "",
      tag: "",
      amount: "",
      date: "",
    },
    validationSchema: incomeExpenseSchema,
    onSubmit: (values) => {
      console.log("Form Values", values);
      handleReset(values);
      setIsOpen("");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen("")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">{`New ${dialogtitle}`}</DialogTitle>
          <DialogDescription className="text-md sm:text-lg">
            {` Please fill all the information carefully. This will help us to keep
            track of your ${
              dialogtitle.toLowerCase() === "income" ? "income" : "expense"
            }.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="account">Account</label>
            <Input
              id="account"
              name="account"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.account}
            />
            {errors && touched.account ? (
              <p className="text-red-500 text-md">{errors?.account}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="counterparty">Counterparty</label>
            <Input
              id="counterparty"
              name="counterparty"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.counterparty}
            />
            {errors && touched.counterparty ? (
              <p className="text-red-500 text-md">{errors.counterparty}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="view-selector" className="sr-only">
              View
            </Label>
            <Select
              name="tag"
              value={values.tag}
              onValueChange={(value) => setFieldValue("tag", value)}
            >
              <SelectTrigger className="!w-full !py-5" size="sm">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
              </SelectContent>
            </Select>
            {errors && touched.tag ? (
              <p className="text-red-500 text-md">{errors.tag}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <Input
              id="amount"
              name="amount"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.amount}
            />
            {errors && touched.amount ? (
              <p className="text-red-500 text-md">{errors.amount}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <Input
              id="date"
              name="date"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
            />
            {errors && touched.date ? (
              <p className="text-red-500 text-md">{errors.date}</p>
            ) : null}
          </div>
          <Button
            className="cursor-pointer !bg-[#d7e6c5] !text-black text-xl font-bold py-4 rounded"
            type="submit"
          >
            {isSubmitting ? " ... " : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
