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

export class Files {

    public static async getFiles(userId: string){

        const q = query(collection(db, "files"), where("userId", "==", userId))
        const snapshot = await getDocs(q)
        
        return snapshot.docs.map((doc: any) =>  { return{id: doc.id, ...doc.data()}})
    }

    public static async getFileById(id: string){
        try {
            const docRef = doc(db, "files", id)
        const docSnap = await getDoc(docRef)

        return Files.formatDoc(docSnap)
        } catch (error) {
            
        }
        
    }

    public static async addFile(payload: any){
        payload = {
            ...payload,
            createdAt: Files.getDate()
        }

        const docRef = await addDoc(collection(db, "files"), payload)

        return docRef

        
    }




    public static async getChildFiles(userId: any, parentId: any){
        const q = query(collection(db, "files"), where("userId", "==", userId), where("parentId", "==", parentId))

        const snapshot = await getDocs(q)

        return snapshot.docs.map((doc: any) =>  { return{id: doc.id, ...doc.data()}})
    }

    private static formatDoc(snapshot: any){
        return {
            id: snapshot.id,
            ...snapshot.data()
        }
    }

    public static getDate() {
    
        const timestamp = new Date()
        return timestamp;
      }
}