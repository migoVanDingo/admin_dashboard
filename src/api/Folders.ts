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

export class Folders {

    public static async getFolders(userId: string){

        const q = query(collection(db, "folders"), where("userId", "==", userId))
        const snapshot = await getDocs(q)

        return snapshot
    }

    public static async getFolderById(id: string){
        const docRef = doc(db, "folders", id)
        const docSnap = await getDoc(docRef)

        return Folders.formatDoc(docSnap)
    }

    public static async addFolder(payload: any){
        payload = {
            ...payload,
            createdAt: Folders.getDate()
        }

        let response = {}
        const docRef = await addDoc(collection(db, "folders"), payload).then((result:any) => {
            response = result
        })
        .catch(e => console.error(e))

        return response
    }


    public static async addRootFolder(userId:any){
      
        try {
            
            const payload = {
                folderId: userId,
                name: "root",
                parentId: "",
                path:["/"],
                createdAt: Folders.getDate()
            }

            console.log('date: ' + Folders.getDate())
    
            const docRef = await setDoc(doc(db, "folders", userId), payload)
            
            return docRef
    
        } catch (error) {
            console.error(error)
        }
        

    }

    public static async getChildFolders(userId: any, parentId: any){
        const q = query(collection(db, "folders"), where("userId", "==", userId), where("parentId", "==", parentId))

        const snapshot = await getDocs(q)

        return snapshot.docs.map((doc: any) =>  doc.data())
    }

    private static formatDoc(snapshot: any){
        return {
            id: snapshot.id,
            ...snapshot.data()
        }
    }

    public static getDate() {
        const a = Timestamp.now()
        const timestamp = new Date(a.seconds)
        console.log("serverTimestamp: " + timestamp);
        return timestamp;
      }
}