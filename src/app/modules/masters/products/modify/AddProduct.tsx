import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import AppForm from "../../../../shared/components/form/AppForm";
import { productForm as initialForm } from "./productForm";
import { createProductThunk } from "../productSlice";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [productForm, setProductForm] = useState(initialForm);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const discountSnapshot = await getDocs(collection(db, "discounts"));
        const discountOptions = discountSnapshot.docs.map((doc) => ({
          label: doc.data().name,
          value: doc.id,
        }));

        const updatedForm = initialForm.map((field) =>
          field.name === "discount"
            ? { ...field, options: discountOptions }
            : field,
        );
        setProductForm(updatedForm);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch discounts.");
      }
    };

    fetchDiscounts();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        price: parseFloat(data.price),
        discount: parseFloat(data.discount),
      };

      await dispatch(createProductThunk(payload)).unwrap();
      toast.success("Product added successfully!");
      navigate("/products");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to add product.");
    }
  };

  return (
    <div className="m-3">
      <h3 className="text mb-3">Add Product</h3>
      <AppForm
        formConfig={productForm}
        actiontype="create"
        submitLabel="Add Product"
        submitClass="btn btn-theme-primary w-40"
        emitData={handleSubmit}
      />
    </div>
  );
};

export default AddProduct;
