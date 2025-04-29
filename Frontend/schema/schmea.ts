import { object, string, number, date } from "yup";

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
const incomeExpenseSchema = object({
  account: string().required("Account is required."),
  counterparty: string().required("Counterparty is required."),
  tag: string()
    .oneOf(["stock", "supplier", "investment"], "Invalid tag")
    .required("Tag is required."),
  amount: number()
    .required("Amount is required.")
    .positive("Amount must be positive."),
  date: date().required("Date is required."),
});

export { authSchema, incomeExpenseSchema };
