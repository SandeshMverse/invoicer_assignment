import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import AppTable from "../../../shared/components/table/AppTable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { discountTableConfig } from "./discountTableConfig";

const Discount = () => {
  const [discount, setDiscount] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchDiscount = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "discounts"));
      console.log("QuerySnapshot size:", querySnapshot.size);

      const data: any[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched discount:", JSON.stringify(data));
      setDiscount(data);
    } catch (error) {
      console.error("Error fetching discount:", error);
    }
  };

  useEffect(() => {
    fetchDiscount();
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
    navigate("/discount/add");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteDoc(doc(db, "discounts", id));
      toast.success("Product deleted successfully!");
      fetchDiscount();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="m-3">
      <h3 className="text mb-3">Discount List</h3>
      <AppTable
        tableConfig={discountTableConfig}
        tableData={discount}
        onActionClick={handleActionClick}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Discount;
