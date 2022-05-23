import { storage } from "./firebaseconfig";

const storageRef = storage.ref("/blog")

// export async function uploadFile(file){        
//     file = file.current.files[0]    
//     return await getFileUrl(file)     
// }

export async function uploadFile(file, path){
    if(!file){
        return ""
    }    
    const ref = storage.ref(path)
    const fileRef = ref.child(file.name)
    const snapshot = await fileRef.put(file)
    const url = await snapshot.ref.getDownloadURL()
    
    return url
}