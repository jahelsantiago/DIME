import { storage } from "./firebaseconfig";

const storageRef = storage.ref("/blog")

export async function uploadFile(file){        
    file = file.current.files[0]    
    if(!file){
        return ""
    }    
    const fileRef = storageRef.child(file.name)
    const snapshot = await fileRef.put(file)
    const url = snapshot.ref.getDownloadURL()
    
    return url 
}