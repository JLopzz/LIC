import { Collection, Doc } from "./usefull";

interface PropFilm {
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
    return this.Data.estreno.toDate();
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
