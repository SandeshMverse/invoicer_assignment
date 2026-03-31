import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppTable from "../../../shared/components/table/AppTable";
import { discountTableConfig } from "./discountTableConfig";
import { fetchDiscounts, removeDiscount } from "./discountSlice";
import { DiscountState, DiscountType } from "./discountTypes"; // type-only import
import { RootState } from "../../config/store";

const Discount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading, error } = useSelector(
    (state: RootState) => state.discounts as DiscountState,
  );

  useEffect(() => {
    dispatch(fetchDiscounts() as any);
  }, [dispatch]);

  const handleActionClick = (action: string, row: DiscountType) => {
    if (action === "delete") {
      if (window.confirm("Are you sure you want to delete this discount?")) {
        dispatch(removeDiscount(row.id!) as any)
          .then(() => toast.success("Discount deleted successfully"))
          .catch(() => toast.error("Failed to delete discount"));
      }
    } else if (action === "edit") {
      navigate(`/discount/edit/${row.id}`);
    } else if (action === "view") {
      navigate(`/discount/view/${row.id}`);
    }
  };

  const handleCreate = () => {
    navigate("/discount/add");
  };

  return (
    <div className="m-3">
      <h3 className="mb-3">Discount List</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <AppTable
        tableConfig={discountTableConfig}
        tableData={list}
        onActionClick={handleActionClick}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Discount;
