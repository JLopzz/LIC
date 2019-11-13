import React from "react";
import Table from "../list";
import { Comestibles } from "../../data";

export default class ComestibleList extends React.Component<{}, {
  rows: Array<Array<string | JSX.Element>>
}>{
  private Comestibles: Comestibles;

  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.Comestibles = new Comestibles();
  }

  componentDidMount() {
    this.Comestibles.get({
      startAt: 0,
      limit: 30,
      orderBy: ["titulo", "asc"]
    }).then(dt => {
      if (dt === false) return;

      this.setState({
        rows: dt.map(c => ([
          c.Id,
          c.Titulo,
          `${c.Precio}`,
          c.Descripcion,
          <img src={c.Imagen} width="50" />
        ]))
      })
    })
  }

  render() {
    return (
      <Table
        title="Comestibles ingresados"
        columns={["id", "Titulo", "Precio", "Descripcion", "Imagen"]}
        data={this.state.rows}
      />
    );
  }
}
