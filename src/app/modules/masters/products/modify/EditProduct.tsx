import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import AppForm from "../../../../shared/components/form/AppForm";
import { productForm as initialForm } from "./productForm";
import { updateProductThunk } from "../productSlice";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const [productForm, setProductForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const discountSnapshot = await getDocs(collection(db, "discounts"));
        const discountOptions = discountSnapshot.docs.map((doc) => ({
          label: doc.data().name,
          value: doc.id,
        }));

        const docRef = doc(db, "items", id!);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          toast.error("Product not found.");
          navigate("/products");
          return;
        }

        const productData = docSnap.data();

        // Map product data to form fields
        const updatedForm = initialForm.map((field) => {
          if (field.name === "discount") {
            return {
              ...field,
              options: discountOptions,
              value: productData.discount || "",
            };
          }
          return { ...field, value: productData[field.name] || "" };
        });

        setProductForm(updatedForm);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product data.");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        price: parseFloat(data.price),
        discount: parseFloat(data.discount),
      };

      await dispatch(updateProductThunk({ id: id!, data: payload })).unwrap();
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update product.");
    }
  };

  if (loading) return <p className="m-3">Loading...</p>;

  return (
    <div className="m-3">
      <h3 className="text mb-3">Edit Product</h3>
      <AppForm
        formConfig={productForm}
        actiontype="edit"
        submitLabel="Update Product"
        submitClass="btn btn-theme-primary w-40"
        emitData={handleSubmit}
      />
    </div>
  );
};

export default EditProduct;