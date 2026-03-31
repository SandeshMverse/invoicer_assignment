import React from "react";
import { RowData } from "./tableTypes";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

type AppTableProps = {
  tableConfig: RowData;
  tableData: any[];
  onActionClick?: (action: string, row: any) => void;
  onCreate?: () => void;
};

const actionIconMap: Record<string, any> = {
  Edit: FaEdit,
  Delete: FaTrash,
  View: FaEye,
};

const AppTable: React.FC<AppTableProps> = ({
  tableConfig,
  tableData,
  onActionClick,
  onCreate,
}) => {
  const renderCell = (header: any, row: any, index: number) => {
    if (header.type === "autoIncrementNumber") return index + 1;

    if (header.type === "action") {
      return header.buttonNames?.map((btn: string) => {
        const Icon = actionIconMap[btn];
        return (
          <button
            key={btn}
            className="btn btn-sm btn-outline-primary btn-outline-primary-custom me-1"
            onClick={() => onActionClick && onActionClick(btn, row)}
          >
            {Icon ? <Icon /> : btn}
          </button>
        );
      });
    }

    if (header.type === "checkdata") {
      const value = row[header.key];
      return <span>{value ? "Yes" : "No"}</span>;
    }

    return row[header.key];
  };

  return (
    <div className="card shadow-sm p-3">
      {tableConfig.button && tableConfig.buttonname && (
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary btn-theme-primary"
            onClick={() => onCreate && onCreate()}
          >
            {tableConfig.buttonname}
          </button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered  text-center">
          <thead className="table-light">
            <tr>
              {tableConfig.headers.map((header) => (
                <th
                  key={header.key}
                  style={{ width: header.size || "auto" }}
                  className="text-center"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 && (
              <tr>
                <td
                  colSpan={tableConfig.headers.length}
                  className="text-center"
                >
                  No records found
                </td>
              </tr>
            )}
            {tableData.map((row, index) => (
              <tr key={row[tableConfig.dataKey || index] || index}>
                {tableConfig.headers.map((header) => (
                  <td key={header.key}>{renderCell(header, row, index)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppTable;
