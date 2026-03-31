// app/shared/components/form/Dropdown.tsx
import React from "react";

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  required?: boolean;
  disabled?: boolean;
  colSize?: string; // bootstrap col size
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  label,
  placeholder = "Select",
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  colSize = "col-12",
}) => {
  return (
    <div className={colSize + " mb-3"}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && "*"}
        </label>
      )}
      <select
        className="form-select"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
