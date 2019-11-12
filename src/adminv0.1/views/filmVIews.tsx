import React from "react";
import Table, { Normalize } from "./list";
import { Films, Film } from "../../data/filme";
import AddView from "./add";
import { Container } from "react-bootstrap";
import uuid from "uuid-random";

import { store } from "../../firebase";

export default class FilmList extends React.Component<{}, {
  filmes: string[][]
}> {
  private Filmes: Films;

  constructor(props) {
    super(props);
    this.state = { filmes: [] };
    this.Filmes = new Films();
  }

  componentDidMount() {
    this.Filmes.load({
      startAt: 0,
      limit: 10,
      orderBy: ["estreno", "asc"]
    }).then(dt => {
      if (dt === false) return;

      this.setState({
        filmes: dt.map(film => ([
          film.Id,
          `(${film.Exhibiendose}) ${film.Titulo}`,
          film.EstrenoFormateado("MM dd yyyy"),
          `${film.Sinopsis.substr(0, 130)} ...`,
          film.Trailer,
          `${film.Portadas.length} portadas`
        ]))
      });
    })
  }

  render() {
    return (
      <Table
        title="Filmes registrados"
        columns={["id", "(Exhibiendose) Titulo", "Fecha de estreno", "Sinopsis", "Trailer", "Portadas"]}
        data={this.state.filmes}
      />
    );
  }
}
