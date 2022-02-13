import { db } from "./firebaseconfig";

//create pointer to the Blog collection
const blogRef = db.collection("Blog");

//create a pointer to the Resumenes document in the blog collection
const resumeRef = blogRef.doc("Resumenes");

//create a function to add a new resume to the Resumenes document, it must be an object with the following properties:
//title: string
//autores: string
//fecha: date
//pagina: number
//resumen: string

export async function addResume(resumen, autores, titulo, fecha, categorias, pagina) {
    const resume = {
        [titulo] : {
        titulo,
        fecha,
        autores,
        resumen,
        categorias,
        pagina,
        }
    }
    let wasSuccesfull = true
    try{
    resumeRef.update(resume)
    }catch(error){
        wasSuccesfull = false
    }
    return wasSuccesfull
}   