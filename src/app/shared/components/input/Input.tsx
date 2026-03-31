import { FormField } from "../form/formTypes";

interface InputProps {
  field: FormField;
  value: any;
  actiontype: "create" | "view" | "edit";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ field, value, actiontype, onChange }: InputProps) => {
  return (
    <>
      <label className="form-label">{field.label}</label>

      <input
        type={field.type}
        name={field.name}
        className="form-control"
        placeholder={field.placeholder}
        value={value || ""}
        disabled={actiontype === "view" || field.disable}
        required={field.required}
        onChange={onChange}
      />
    </>
  );
};

export default Input;