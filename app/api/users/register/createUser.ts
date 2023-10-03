import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const controller = async (id: string, name: string, lastname: string, email: string) => {
    const userRef = doc(db, "users", id);
    setDoc(userRef, {
        name,
        lastname,
        email
    })
}