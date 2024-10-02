import * as Yup from "yup";

// Validation schema
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password minimum length should be 8")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

export const LoginValidator = Yup.object().shape({
  email: Yup.string().email("invalid email").required(),
  password: Yup.string()
    .min(8, "Password minimum length should be 8")
    .required("Password is required"),
});
