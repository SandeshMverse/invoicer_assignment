import React from "react";
import { InvoiceItem } from "../../../modules/operations/invoiceTypes";

interface Props {
  items: InvoiceItem[];
  onQuantityChange: (id: string, quantity: number) => void;
}

const InvoiceTable: React.FC<Props> = ({ items, onQuantityChange }) => {
  return (
    <table className="table table-bordered  text-center">
      <thead className="table-light">
        <tr>
          <th>SrNo</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={item.id}>
            <td>{idx + 1}</td>
            <td>{item.name}</td>
            <td>₹{item.price.toFixed(2)}</td>
            <td>
              <input
                type="number"
                min={0}
                value={item.quantity}
                className="form-control"
                onChange={(e) =>
                  onQuantityChange(item.id, Number(e.target.value))
                }
              />
            </td>
            <td>₹{item.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
