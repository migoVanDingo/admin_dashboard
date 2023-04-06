import { Timestamp } from "firebase/firestore";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  where,
  query,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export class Users {
  private static formatDoc(doc: any) {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  public static getDate() {
    const a = Timestamp.now()
    const timestamp = new Date(a.seconds)

    return timestamp;
  }

  public static async getUsers(userId: string) {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot;
  }

  public static async getUserById(id: string) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return this.formatDoc(docSnap);
  }

  public static async addUser(payload: any) {
    const userPayload = {
      id: payload.uid,
      email: payload.email,
      createdAt: this.getDate(),
    };

    return await setDoc(doc(db, "users", payload.uid), userPayload);
  }
}
