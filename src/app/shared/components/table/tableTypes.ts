export type Header = {
    label: string;
    key: string;
    type?: "autoIncrementNumber" | "action" | string;
    size?: string; 
    buttonNames?: string[];
};

export type RowData = {
    headers: Header[];
    dataKey?: string;
    button?: boolean;
    buttonname?: string;
};