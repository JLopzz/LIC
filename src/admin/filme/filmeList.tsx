import React from "react";
import Table from "../list";
import { Filmes } from "../../data";

export default class FilmeList extends React.Component<{}, {
  rows: Array<Array<string | JSX.Element>>
}> {
  private Filmes: Filmes;

  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.Filmes = new Filmes();
  }

  componentDidMount() {
    this.Filmes.get({
      startAt: 0,
      limit: 30,
      orderBy: ["estreno", "asc"]
    }).then(dt => {
      if (dt === false) return;

      this.setState({
        rows: dt.map(filme => ([
          filme.Id,
          `(${filme.Exhibiendose ? "Si" : "No"}) ${filme.Titulo}`,
          filme.EstrenoFormateado("MM dd, yyyy"),
          `${filme.Sinopsis.substr(0, 130)} ...`,
          <a href={filme.Trailer} >enlace</a>,
          <img src={filme.Portada} width="50" />,
          `${(filme.Imagenes) ? filme.Imagenes.length : 0} imagenes`
        ]))
      });
    })
  }

  render() {
    return (
      <Table
        title="Filmes registrados"
        columns={["id", "(Exhibiendose) Titulo", "Fecha de estreno", "Sinopsis", "Trailer", "Portada", "Galeria"]}
        data={this.state.rows}
      />
    );
  }
}
