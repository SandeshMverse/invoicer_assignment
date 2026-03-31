import { FormField } from "../../../shared/components/form/formTypes";

export const loginForm: FormField[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    type: "email",
    validation: "email",
    required: true,
    colsize: "col-12 mb-3"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    validation: "password",
    required: true,
    colsize: "col-12 mb-3"
  },
];