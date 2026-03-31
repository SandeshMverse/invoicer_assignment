export type ActionType = "create" | "view" | "edit";

export type ValidationType = "email" | "password" | "number" | "text";

export interface FormField {
    name: string;
    label: string;
    placeholder?: string;
    type: string;
    validation?: ValidationType;
    value?: any;
    required?: boolean;
    disable?: boolean;
    colsize?: string;
    options?: { label: string; value: string | number }[];
}

export interface AppFormProps {
    formConfig: FormField[];
    actiontype: ActionType;
    formData?: any;
    submitLabel?: string;
    submitClass?: string;
    
    emitData: (data: any) => void;
}