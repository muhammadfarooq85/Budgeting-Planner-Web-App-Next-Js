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
import { transactionSchema } from "@/schema/schema";
import { TransactionFormTypes } from "@/types/types";
import { transactionsTypes } from "@/constants/constants";

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
  } = useFormik<TransactionFormTypes>({
    initialValues: {
      purposeOfTransaction: "",
      type: "",
      description: "",
      issueDate: "",
      amount: 0,
      senderDetails: {
        name: "",
        accountNumber: "",
        email: "",
        bankName: "",
        address: "",
      },
      receiverDetails: {
        name: "",
        accountNumber: "",
        email: "",
        bankName: "",
        address: "",
      },
    },
    validationSchema: transactionSchema,
    onSubmit: (values) => {
      console.log("Form Values", values);
      handleReset(values);
      setIsOpen("");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen("")}>
      <DialogContent className="lg:!max-w-6xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">{`New ${dialogtitle}`}</DialogTitle>
          <DialogDescription className="text-md sm:text-lg">
            {` Please fill all the information carefully. This will help us to keep
            track of your ${
              dialogtitle.toLowerCase() === "income" ? "income" : "expense"
            }.`}
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2 justify-between">
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
                <Label htmlFor="amount" className="!text-lg mb-1 font-semibold">
                  Amount:
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  aria-label="Amount"
                  placeholder="Please select an amount."
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors && touched.amount ? (
                  <p className="text-red-500 text-md">{errors.amount}</p>
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
                  Purpose Of Transaction:
                </Label>
                <Input
                  id="purposeOfTransaction"
                  name="purposeOfTransaction"
                  type="text"
                  aria-label="Purpose Of Transaction"
                  placeholder="Please enter a purpose of transaction."
                  value={values.purposeOfTransaction}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors && touched.purposeOfTransaction ? (
                  <p className="text-red-500 text-md">
                    {errors.purposeOfTransaction}
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
            </div>
            <div className="flex flex-col gap-2 justify-between">
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
                  aria-label="Sender Address"
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
                  type="text"
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
                  aria-label="Receiver Address"
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
            </div>
          </div>
          <div>
            <Label htmlFor="type" className="!text-lg mb-1 font-semibold">
              Transation Type:
            </Label>
            <Select
              name="type"
              value={values.type}
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
            {errors && touched.type ? (
              <p className="text-red-500 text-md">{errors.type}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Button
              id="done"
              name="done"
              className="!bg-red-200 !text-black !font-bold !text-lg cursor-pointer"
              type="button"
              onClick={() => setIsOpen("")}
              aria-label="Done"
            >
              Cancel
            </Button>
            <Button
              id="save"
              name="save"
              className="!bg-[#d7e6c5] !text-black !font-bold !text-lg cursor-pointer"
              type="submit"
              aria-label="Save"
            >
              {isSubmitting ? " ... " : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
