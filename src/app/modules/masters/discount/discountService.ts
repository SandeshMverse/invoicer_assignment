import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export const getDiscounts = async () => {
    const snapshot = await getDocs(collection(db, "discounts"));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};