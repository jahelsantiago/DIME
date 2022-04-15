import { db } from "./firebaseconfig";

//create pointer to the Blog collection
const blogRef = db.collection("Blog");
const propiedad_intelectualRef = db.collection("Propiedad_Intelectual");

//create a pointer to the Resumenes document in the blog collection
const resumeRef = blogRef.doc("Resumenes");

const bibliotecaRef = propiedad_intelectualRef.doc("Biblioteca");

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


export async function uploadBiblioteca(titulo, descripcion, tipo, archivos) {
    archivos = unpackArchivos(archivos)
    
    const biblioteca = {
        [titulo] : {
        titulo,
        descripcion,
        tipo,
        archivos,
        }
    }
    let wasSuccesfull = true
    try{
    bibliotecaRef.update(biblioteca)
    }catch(error){
        wasSuccesfull = false
        console.log(error)
    }
    return wasSuccesfull
}

function unpackArchivos(archivos){
    let archivos_unpacked = []
    for(let i = 0; i < archivos.length; i++){
        archivos_unpacked.push({
            name:archivos[i].payload.text,
            url:archivos[i].payload.url
        })
    }
    return archivos_unpacked
}