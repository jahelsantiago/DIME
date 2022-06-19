import { db } from "../firebaseconfig";

const preciosCollection = db.collection("Precios");



export async function addPrecio(titulo, descripcion, image_url, download_url) {
  const precio = {
    titulo,
    descripcion,
    image_url,
    download_url,
  };
  let wasSuccesfull = true;
  try {
    preciosCollection.add(precio);
  } catch (error) {
    wasSuccesfull = false;
  }
  return wasSuccesfull;
}
