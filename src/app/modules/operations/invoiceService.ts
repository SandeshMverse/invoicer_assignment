import { collection, getDocs } from "firebase/firestore";
import { InvoiceItem } from "./invoiceTypes";
import { db } from "../config/firebase";

export const fetchProducts = async (): Promise<InvoiceItem[]> => {
  const snapshot = await getDocs(collection(db, "items"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    price: Number(doc.data().price),
    discount: doc.data().discount,
    quantity: 0,
    amount: 0,
  }));
};