import * as firebase from "firebase/app";
import { DateFormater } from "../tools";
import Collection from "../firestore/collection";
import Document from "../firestore/document";

export interface FilmeProps {
  titulo: string
  estreno: firebase.firestore.Timestamp
  exhibiendose: boolean
  sinopsis: string
  trailer: string
  portada: string
  imagenes: string[]
}

/**
 * Filmes
 */

export class Filme extends Document<FilmeProps>{
  constructor(id?: string, data?: FilmeProps) {
    super({
      collection: "filmes",
      id: id,
      data: (!!data && !!data.titulo) ? data : {}
    });
  }

  Titulo = this.data.titulo;
  Estreno = this.data.estreno;
  Exhibiendose = this.data.exhibiendose;
  Sinopsis = this.data.sinopsis;
  Trailer = this.data.trailer;
  Portada = this.data.portada;
  Imagenes = this.data.imagenes;

  public EstrenoFormateado(format: string): string {
    return DateFormater(this.data.estreno.toDate(), format);
  }
}

/**
 * FilmesCollecion
 */
export class Filmes extends Collection<Filme>{
  constructor() {
    super({
      collection: "filmes",
      ensambler: (id, data) => new Filme(id, (data as FilmeProps))
    });
  }
}
