import { object, array, string, number, date } from "yup";

const authSchema = object({
  email: string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: string()
    .min(8, "Password at least be 8 characters.")
    .max(20, "Password must be 20 characters or less.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/, {
      message:
        "Password must be one uppercase, one lowercase, one number and one special letter.",
    })
    .required("Password is required."),
});

const invoiceSchema = object().shape({
  issueDate: string().required("Issue date is required."),
  dueDate: string().required("Due date is required."),
  description: string().required("Description is required."),
  purposeOfInvoice: string().required("Purpose of invoice is required."),
  status: string().required("Status is required"),
  senderDetails: object().shape({
    name: string().required("Sender name is required."),
    bankName: string().required("Sender bank name is required."),
    email: string()
      .email("Invalid sender email.")
      .required("Sender email is required."),
    accountNumber: string().required("Sender account number is required."),
    address: string().required("Sender address is required."),
  }),
  receiverDetails: object().shape({
    name: string().required("Receiver name is required."),
    bankName: string().required("Receiver bank name is required."),
    accountNumber: string().required("Receiver account number is required."),
    email: string()
      .email("Invalid receiver email.")
      .required("Receiver email is required."),
    address: string().required("Receiver address is required."),
  }),
  items: array()
    .of(
      object().shape({
        name: string().required("Item name is required."),
        quantity: number()
          .typeError("Quantity must be a number.")
          .required("Quantity is required.")
          .min(1, "Quantity must be at least 1."),
        pricePerUnit: number()
          .required("Price per unit is required.")
          .min(0, "Price must be positive"),
      })
    )
    .min(1, "At least one item is required."),
});

const transactionSchema = object({
  amount: number()
    .typeError("Amount must be a number.")
    .positive("Amount must be a positive number.")
    .required("Amount is required."),
  type: string()
    .oneOf(["income", "expense"], "Type must be either income or expense.")
    .required("Transaction type is required."),
  description: string().required("Description is required."),
  purposeOfTransaction: string().required(
    "Purpose of transaction is required."
  ),
  issueDate: date()
    .typeError("Issue date must be a valid date.")
    .required("Issue date is required."),
  senderDetails: object({
    name: string().required("Sender name is required."),
    accountNumber: string().required("Sender account number is required."),
    email: string()
      .email("Sender email must be a valid email.")
      .required("Sender email is required."),
    bankName: string().required("Sender bank name is required."),
    address: string().required("Sender address is required."),
  }),
  receiverDetails: object({
    name: string().required("Receiver name is required."),
    accountNumber: string().required("Receiver account number is required."),
    email: string()
      .email("Receiver email must be a valid email.")
      .required("Receiver email is required."),
    bankName: string().required("Receiver bank name is required."),
    address: string().required("Receiver address is required."),
  }),
});

export { authSchema, invoiceSchema, transactionSchema };
