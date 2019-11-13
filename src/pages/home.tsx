import React from "react";
import { Separator, Card, CardContainer } from "./parts";
import { Filmes, Filme } from "../data";

export default class Inicio extends React.Component<{}, {
  exhibicion: Filme[],
  estrenos: Filme[]
}> {
  private Filmes: Filmes;

  constructor(props) {
    super(props);
    this.state = { exhibicion: [], estrenos: [] };
    this.Filmes = new Filmes();
  }

  componentDidMount() {
    this.Filmes.get({
      startAt: 0,
      limit: 5,
      orderBy: ["estreno", "asc"],
      where: [["exhibiendose", "==", true]]
    }).then((data) => {
      if (data) this.setState({ exhibicion: data });
    });

    this.Filmes.get({
      startAt: 0,
      limit: 5,
      orderBy: ["estreno", "asc"],
      where: [["exhibiendose", "==", false]]
    }).then((data) => {
      if (data) this.setState({ estrenos: data });
    })
  }

  render() {
    let { exhibicion, estrenos } = this.state;

    return (
      <>
        <Separator title="🎬Películas en cartelera🎬" />
        <CardContainer cards={exhibicion.map(film =>
          <Card key={film.Id}
            url={`./filme/${film.Id}`}
            title={film.Titulo}
            img={film.Portada}
            text={film.Sinopsis.substr(0, 130) + "..."}
          />
        )} />
        <Separator title="🎬Próximos Estrenos🎬" />
        <CardContainer cards={estrenos.map(film =>
          <Card key={film.Id}
            url={`./filme/${film.Id}`}
            title={film.Titulo}
            img={film.Portada}
            text={film.Sinopsis.substr(0, 130) + "..."}
          />
        )} />
      </>
    );
  }
}
