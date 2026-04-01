import { RowData } from "../../../shared/components/table/tableTypes";

export const discountTableConfig: RowData = {
    headers: [
        { label: "Sr.No", key: "sr_no", type: "autoIncrementNumber", size: "4%" },
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
        {
            label: "Action",
            key: "action",
            type: "action",
            size: "15%",
            buttonNames: ["delete"],
        },
    ],
    dataKey: "id",
    buttonname: "Add Discount",
    button: false,
};

