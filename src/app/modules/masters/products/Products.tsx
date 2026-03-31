import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import AppTable from "../../../shared/components/table/AppTable";
import { productTableConfig } from "./productTableConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      console.log("QuerySnapshot size:", querySnapshot.size);

      const data: any[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched products:", JSON.stringify(data));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleActionClick = (action: string, row: any) => {
    console.log(action, row);
    if (action === "delete") {
      if (!window.confirm("Are you sure you want to delete this product?"))
        return;
      handleDelete(row.id);
    } else {
      toast.error("Action not implemented yet.");
    }
  };

  const handleCreate = () => {
    navigate("/products/add");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteDoc(doc(db, "items", id));
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="m-3">
      <h3 className="text mb-3">Products List</h3>
      <AppTable
        tableConfig={productTableConfig}
        tableData={products}
        onActionClick={handleActionClick}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Products;
