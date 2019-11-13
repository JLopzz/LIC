import Collection from "../firestore/collection";
import Document from "../firestore/document";

export interface ComestibleProps {
  titulo: string
  precio: number
  descripcion: string
  imagen: string
}

/**
 * Comestible
 */
export class Comestible extends Document<ComestibleProps>{
  constructor(id?: string, data?: ComestibleProps) {
    super({
      collection: "comestibles",
      id: id,
      data: (!!data && !!data.titulo) ? data : {}
    });
  }

  Titulo = this.data.titulo;
  Precio = this.data.precio;
  Descripcion = this.data.descripcion;
  Imagen = this.data.imagen;
}

/**
 * ComestiblesCollection
 */
export class Comestibles extends Collection<Comestible>{
  constructor() {
    super({
      collection: "comestibles",
      ensambler: (id, data) => new Comestible(id, (data as ComestibleProps))
    });
  }
}
