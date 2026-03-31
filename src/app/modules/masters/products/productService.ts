import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const collectionName = "products";

export const getProducts = async () => {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const addProduct = async (data: any) => {
    await addDoc(collection(db, collectionName), data);
};