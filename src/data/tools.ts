import * as firebase from "firebase/app";
import { store } from "./firebase";
import uuid from "uuid-random";

export const SUPPORTED_IMG_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png"
];

/**
 * Helper for upload files to Firebase Store
 * @param path Firebase Store location to upload the file
 * @param file File to be upload
 * @param state Callback to watch progress of the upload
 */

export async function UploadFile(path: string, file: File, state?: (param: number) => void): Promise<any> {
  let url = `${path}${uuid()}.${file.type.split("/")[1]}`;

  try {
    let uploadTask = store.ref(url).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      snap => {
        if (!!state) state(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
      });

    await uploadTask.then();

    return await uploadTask.snapshot.ref.getDownloadURL();
  } catch (e) { throw e; }
}

/**
 * Genera una cadena a partir de una fecha
 * @param date Fecha a transformar
 * @param str Cadena a ser sustituida
 */

export function DateFormater(date: Date, str: string) {
  let labelDay = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  let labelMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let res = new String(str).toString();
  res = res.replace("dd", date.getDate().toString());
  res = res.replace("DD", labelDay[date.getDay()]);
  res = res.replace("mm", (date.getMonth() + 1).toString());
  res = res.replace("MM", labelMonth[date.getMonth()]);
  res = res.replace("yyyy", date.getFullYear().toString());

  return res;
}
