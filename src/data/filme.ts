import { Collection, Doc } from "./usefull";
import { store } from "../firebase";


/**
 * Date formatter
 */
function Formater(date: Date, str: string) {
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

export interface PropFilm {
  titulo: string;
  estreno: any;
  exhibiendose: boolean;
  sinopsis: string;
  trailer: string;
  portada: Array<string>;
}

/**
 * Filmes
 */
export class Film extends Doc<PropFilm>{
  constructor(id?: string, props?: PropFilm) {
    super("peliculas", id, props);
  }

  public get Titulo(): string {
    return this.Data.titulo;
  }
  public get Estreno(): Date {
    return this.Data.estreno;
  }
  public get Exhibiendose(): boolean {
    return this.Data.exhibiendose;
  }
  public get Sinopsis(): string {
    return this.Data.sinopsis;
  }
  public get Trailer(): string {
    return this.Data.trailer;
  }
  public get Portadas(): Array<string> {
    return this.Data.portada;
  }
  public get Portada() {
    return store.ref(`/filmes/portada/${this.Portadas[0]}`);
  }

  public EstrenoFormateado(format: string): string {
    return Formater(this.Data.estreno as Date, format);
  }

  public async Add() {
    
  }
}

/**
 * Filmes
 */
export class Films extends Collection<Film>{
  constructor() {
    super("peliculas", (id, data) => {
      let values: PropFilm = {
        titulo: data.titulo,
        estreno: data.estreno.toDate(),
        exhibiendose: data.exhibiendose,
        sinopsis: data.sinopsis,
        trailer: data.trailer,
        portada: data.portada
      }

      return new Film(id, values);
    });
  }
}
