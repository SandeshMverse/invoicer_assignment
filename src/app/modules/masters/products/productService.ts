import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { Product } from "./productTypes";

const collectionName = "items";

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || "",       
      price: Number(data.price) || 0,
      discount: Number(data.discount) || 0,
      description: data.description || "",  
    } as Product;
  });
};

export const addProduct = async (data: Product) => {
  await addDoc(collection(db, collectionName), data);
};

export const updateProduct = async (id: string, data: Product) => {
  await setDoc(doc(db, collectionName, id), data);
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, collectionName, id));
};