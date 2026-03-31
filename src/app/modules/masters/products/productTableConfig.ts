import { RowData } from "../../../shared/components/table/tableTypes";

export const productTableConfig: RowData = {
    headers: [
        { label: "Sr.No", key: "sr_no", type: "autoIncrementNumber", size: "4%" },
        { label: "Name", key: "name" },
        { label: "Price", key: "price" },
        { label: "Discount", key: "discount" ,type: "checkdata"},
        { label: "Description", key: "description" },
        {
            label: "Action",
            key: "action",
            type: "action",
            size: "15%",
            buttonNames: ["edit", "view", "delete"],
        },
    ],
    dataKey: "id", 
    buttonname: "Add Product",
    button: true,
};

