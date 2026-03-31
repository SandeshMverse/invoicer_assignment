import { Routes, Route, Navigate } from "react-router-dom";
import Products from "../../modules/masters/products/Products";
import Discount from "../../modules/masters/discount/Discount";
import AddProduct from "../../modules/masters/products/modify/AddProduct";
import EditProduct from "../../modules/masters/products/modify/EditProduct";
import Invoice from "../../modules/operations/Invoice";

const SharedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/invoice" replace />} />
      <Route path="/invoice" element={<Invoice />} />

      <Route path="/products" element={<Products />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />

      <Route path="/discounts" element={<Discount />} />
    </Routes>
  );
};

export default SharedRoutes;
