// Library Imports
import { Formik, FieldArray, Form } from "formik";
// Local Imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { invoiceSchema } from "@/schema/schema";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { InvoiceFormTypes } from "@/types/types";
import { invoiceStatusTypes } from "@/constants/constants";

export default function InvoiceModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const initialValues: InvoiceFormTypes = {
    issueDate: "",
    dueDate: "",
    description: "",
    purposeOfInvoice: "",
    status: "",
    senderDetails: {
      name: "",
      bankName: "",
      accountNumber: "",
      email: "",
      address: "",
    },
    receiverDetails: {
      name: "",
      bankName: "",
      accountNumber: "",
      email: "",
      address: "",
    },
    items: [{ name: "", quantity: 0, pricePerUnit: 0 }],
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="lg:!max-w-6xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">New Invoice</DialogTitle>
          <DialogDescription className="text-md sm:text-lg">
            Please fill all the information carefully. This will help us to keep
            track of your invoices.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={invoiceSchema}
          onSubmit={(values, actions) => {
            console.log("Form Values", values);
            actions.resetForm();
            setIsOpen(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex flex-col justify-between gap-2">
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
                      aria-label="Issue Date"
                      placeholder="Select an issue date."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.issueDate}
                      required
                    />
                    {errors && touched.issueDate ? (
                      <p className="text-red-500 text-md">{errors.issueDate}</p>
                    ) : null}
                  </div>
                  <div>
                    <Label
                      htmlFor="dueDate"
                      className="!text-lg mb-1 font-semibold"
                    >
                      Due Date:
                    </Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      aria-label="Due Date"
                      placeholder="Select a due Date."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dueDate}
                      required
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
                      aria-label="Invoice Description"
                      placeholder="Please enter invoice description."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      required
                    />
                    {errors && touched.description ? (
                      <p className="text-red-500 text-md">
                        {errors.description}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label
                      htmlFor="purposeOfInvoice"
                      className="!text-lg mb-1 font-semibold"
                    >
                      Purpose Of Invoice:
                    </Label>
                    <Input
                      id="purposeOfInvoice"
                      name="purposeOfInvoice"
                      type="text"
                      aria-label="Purpose Of Invoice"
                      placeholder="Please enter purpose of invoice."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.purposeOfInvoice}
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
                      placeholder="Please enter a sender bankName."
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
                      aria-label="Sender Email"
                      placeholder="Please enter a sender Account Number."
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
              <div className="mt-2">
                <Label htmlFor="status" className="!text-lg mb-1 font-semibold">
                  Status
                </Label>
                <Select
                  name="status"
                  value={values.status}
                  onValueChange={(value) => setFieldValue("status", value)}
                >
                  <SelectTrigger className="!w-full">
                    <SelectValue placeholder="Select invoice Status." />
                  </SelectTrigger>
                  <SelectContent>
                    {invoiceStatusTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.slice(0, 1).toUpperCase() +
                          type.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors && touched.status && (
                  <p className="text-red-500 text-sm">{errors.status}</p>
                )}
              </div>
              <FieldArray name="items">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-4 mt-4">
                    {values.items.map((item, index) => (
                      <div key={index} className="flex gap-4 items-end">
                        <div className="w-full">
                          <Label
                            htmlFor={`items[${index}].name`}
                            className="!text-lg mb-1 font-semibold"
                          >
                            Item Name:
                          </Label>
                          <Input
                            id={`items[${index}].name`}
                            name={`items[${index}].name`}
                            type="text"
                            aria-label={`items[${index}].name`}
                            value={item.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Please an enter Item name."
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
                        <div className="w-full">
                          <Label
                            htmlFor={`items[${index}].quantity`}
                            className="!text-lg mb-1 font-semibold"
                          >
                            Quantity:
                          </Label>
                          <Input
                            id={`items[${index}].quantity`}
                            name={`items[${index}].quantity`}
                            type="number"
                            aria-label={`items[${index}].quantity`}
                            value={item.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Please enter item quantity."
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
                        <div className="w-full">
                          <Label
                            htmlFor={`items[${index}].pricePerUnit`}
                            className="!text-lg mb-1 font-semibold"
                          >
                            Price Per Unit:
                          </Label>
                          <Input
                            id={`items[${index}].pricePerUnit`}
                            name={`items[${index}].pricePerUnit`}
                            type="number"
                            aria-label={`items[${index}].pricePerUnit`}
                            value={item.pricePerUnit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Pleas enter item price."
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
                        {index > 0 && (
                          <Button
                            id="removeItem"
                            name="removeItem"
                            type="button"
                            aria-label="Remove Item"
                            variant="outline"
                            size="sm"
                            onClick={() => remove(index)}
                            className="!bg-red-200 cursor-pointer"
                          >
                            <IconMinus />
                            <span className="hidden lg:inline">
                              Remove Item
                            </span>
                          </Button>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <Button
                        id="addItem"
                        name="addItem"
                        type="button"
                        aria-label="Add Item"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          push({
                            name: "",
                            quantity: "",
                            pricePerUnit: "",
                          })
                        }
                        className="!bg-[#d7e6c5] cursor-pointer"
                      >
                        <IconPlus />
                        <span className="hidden lg:inline">Add Item</span>
                      </Button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="flex items-center gap-2">
                <Button
                  id="done"
                  name="done"
                  className="!bg-red-200 !text-black !font-bold !text-lg cursor-pointer"
                  type="button"
                  aria-label="Done"
                  onClick={() => setIsOpen(false)}
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
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
