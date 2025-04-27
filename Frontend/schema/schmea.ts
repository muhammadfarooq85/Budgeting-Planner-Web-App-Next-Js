import { object, string } from "yup";

const authScehma = object({
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

export { authScehma };
