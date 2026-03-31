import { useEffect, useState } from "react";
import { AppFormProps, FormField } from "./formTypes";
import Input from "../input/Input";
import Dropdown from "../dropdown/Dropdown"; // import dropdown

const AppForm = ({
  formConfig,
  emitData,
  actiontype,
  formData,
  submitLabel,
  submitClass,
}: AppFormProps) => {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const initial: any = {};
    formConfig.forEach((field: FormField) => {
      initial[field.name] = formData?.[field.name] || field.value || "";
    });
    setForm(initial);
  }, [formConfig, formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdownChange = (name: string, value: string | number) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emitData(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {formConfig.map((field: FormField) => (
          <div className={field.colsize || "col-md-6 mb-3"} key={field.name}>
            {field.type === "dropdown" ? (
              <Dropdown
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                options={field.options || []}
                value={form[field.name]}
                onChange={(value) => handleDropdownChange(field.name, value)}
                required={field.required}
                disabled={field.disable}
              />
            ) : (
              <Input
                field={field}
                value={form[field.name]}
                actiontype={actiontype}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </div>

      {actiontype !== "view" && (
        <div className="d-flex justify-content-end">
          <button className={submitClass || "btn btn-primary"}>
            {submitLabel || "Submit"}
          </button>
        </div>
      )}
    </form>
  );
};

export default AppForm;