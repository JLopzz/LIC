import React from "react";
import { Comestible, Comestibles } from "../data";
import { Separator, CardContainer, Card } from "./parts";

export default class Dulceria extends React.Component<{}, {
  comestibles: Comestible[]
}>{
  private Comestibles: Comestibles;

  constructor(props) {
    super(props);
    this.state = { comestibles: [] };
    this.Comestibles = new Comestibles();
  }

  componentDidMount() {
    this.Comestibles.get({
      startAt: 0,
      limit: 30,
      orderBy: ["titulo", "asc"]
    }).then((dt) => {
      if (dt) this.setState({ comestibles: dt });
    });
  }

  render() {
    let { comestibles } = this.state;

    return (
      <>
        <Separator title="⚡Comida y Dulces⚡" />
        <CardContainer variant="columns" cards={comestibles.map(c =>
          <Card key={c.Id} flex
            title={`${c.Titulo} $${c.Precio.toFixed(2)}`}
            img={c.Imagen}
            text={c.Descripcion}
          />
        )} />
      </>
    );
  }
}
