import { db } from "./firebaseconfig";
import firebase from "firebase";

//create pointer to the Blog collection
const blogRef = db.collection("Blog");
const propiedad_intelectualRef = db.collection("Propiedad_Intelectual");

//create a pointer to the Resumenes document in the blog collection
const resumeRef = blogRef.doc("Resumenes");

const bibliotecaRef = propiedad_intelectualRef.doc("Biblioteca");

const bibliotecaCollection = db.collection("Biblioteca_Propiedad");
const bibliotecaTypes = db.collection("Biblioteca_Propiedad_Tipos");

//create a function to add a new resume to the Resumenes document, it must be an object with the following properties:
//title: string
//autores: string
//fecha: date
//pagina: number
//resumen: string

export async function addResume(
  resumen,
  autores,
  titulo,
  fecha,
  categorias,
  pagina
) {
  const resume = {
    [titulo]: {
      titulo,
      fecha,
      autores,
      resumen,
      categorias,
      pagina,
    },
  };
  let wasSuccesfull = true;
  try {
    resumeRef.update(resume);
  } catch (error) {
    wasSuccesfull = false;
  }
  return wasSuccesfull;
}

/**
 * Añade una nueva propiedad intelectual a la biblioteca
 * @param {*} titulo
 * @param {*} descripcion
 * @param {*} tipo
 * @param {*} archivos
 * @param {*} referencias
 * @returns
 */
export async function addBiblioteca(
  titulo,
  descripcion,
  tipo,
  archivos,
  referencia
) {
  archivos = unpackArchivos(archivos);
  const biblioteca = { titulo, descripcion, tipo, archivos, referencia };
  let wasSuccesfull = true;
  try {
    bibliotecaCollection.add(biblioteca);
  } catch (error) {
    console.log(error);
    wasSuccesfull = false;
  }
  return wasSuccesfull;
}

/**
 * Retorna una lista con todos los elementos de la biblioteca
 * @returns list
 */
export async function getBiblioteca() {
  let biblioteca = await bibliotecaCollection.get();
  biblioteca = biblioteca.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return biblioteca;
}

export async function getBibliotecaTypes() {
  let biblioteca = await bibliotecaTypes.get();
  biblioteca = biblioteca.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return biblioteca;
}

/**
 * Elimina una propiedad intelectual de la biblioteca
 * @param {*} bibliotecaID
 */
export async function deleteBiblioteca(bibliotecaID) {
  bibliotecaCollection.doc(bibliotecaID).delete();
}

function unpackArchivos(archivos) {
  let archivos_unpacked = [];
  for (let i = 0; i < archivos.length; i++) {
    archivos_unpacked.push({
      text: archivos[i].payload.text,
      link: archivos[i].payload.url,
    });
  }
  return archivos_unpacked;
}

export async function readBiblioteca() {
  let data = await (await bibliotecaRef.get()).data();
  //convert objetct to array
  data = Object.entries(data);
  //convert array to array of objects
  data = data.map((item) => {
    return {
      titulo: item[0],
      ...item[1],
    };
  });
  return data;
}

