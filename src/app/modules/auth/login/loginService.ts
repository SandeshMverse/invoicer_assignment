import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export const loginUser = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password);

  const user = response.user;

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
};