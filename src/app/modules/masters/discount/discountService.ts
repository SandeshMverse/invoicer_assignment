import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { DiscountType } from "./discountTypes";

export const getDiscounts = async (): Promise<DiscountType[]> => {
  const snapshot = await getDocs(collection(db, "discounts"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as DiscountType[];
};

export const updateDiscount = async (id: string, data: Partial<DiscountType>) => {
  const ref = doc(db, "discounts", id);
  await updateDoc(ref, data);
};

export const deleteDiscount = async (id: string) => {
  const ref = doc(db, "discounts", id);
  await deleteDoc(ref);
};