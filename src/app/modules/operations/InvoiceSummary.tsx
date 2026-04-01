import React from "react";

interface Props {
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  onDownload: () => void;
}

const InvoiceSummary: React.FC<Props> = ({
  totalAmount,
  discountAmount,
  finalAmount,
  onDownload,
}) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-theme-primary text-white">
        <h4 className="mb-0">Invoice Summary</h4>
      </div>
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-6 text-muted">Total Amount:</div>
          <div className="col-6 text-end">£{totalAmount.toFixed(2)}</div>
        </div>
        <div className="row mb-2">
          <div className="col-6 text-muted">Discount:</div>
          <div className="col-6 text-end text-success">- £{discountAmount.toFixed(2)}</div>
        </div>
        <hr />
        <div className="row fw-bold fs-5">
          <div className="col-6">Total Payable:</div>
          <div className="col-6 text-end text-success">£{finalAmount.toFixed(2)}</div>
        </div>
        <div className="d-grid mt-4">
          <button className="btn btn-theme-primary btn-lg" onClick={onDownload}>
            <i className="bi bi-download me-2"></i> Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;