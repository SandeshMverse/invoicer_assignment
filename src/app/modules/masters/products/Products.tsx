import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppTable from "../../../shared/components/table/AppTable";
import { productTableConfig } from "./productTableConfig";
import type { Product } from "./productTypes";
import { fetchProducts, deleteProductThunk } from "./productSlice";
import { RootState } from "../../config/store";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const handleActionClick = (action: string, row: Product) => {
    if (action === "delete") {
      if (window.confirm("Are you sure you want to delete this product?")) {
        dispatch(deleteProductThunk(row.id!) as any)
          .then(() => toast.success("Product deleted successfully"))
          .catch(() => toast.error("Failed to delete product"));
      }
    } else if (action === "edit") {
      navigate(`/products/edit/${row.id}`);
    } else if (action === "view") {
      navigate(`/products/view/${row.id}`);
    }
  };

  const handleCreate = () => navigate("/products/add");

  return (
    <div className="m-3">
      <h3 className="mb-3">Products List</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <AppTable
        tableConfig={productTableConfig}
        tableData={list}
        onActionClick={handleActionClick}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Products;