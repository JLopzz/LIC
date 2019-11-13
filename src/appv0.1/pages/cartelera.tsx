import React from "react";
import { Separator, CardContainer, Card } from "../parts";
import { Filmes, Filme } from "../../data";

export default class Cartelera extends React.Component<{
  match: {
    params: {
      exhibiendose: string
    }
  }
}, {
  filmes: Filme[]
}> {
  private Filmes: Filmes;

  constructor(props) {
    super(props);
    this.state = { filmes: [] };
    this.Filmes = new Filmes();
  }

  componentDidMount() {
    this.Filmes.get({
      startAt: 0,
      limit: 5,
      orderBy: ["estreno", "asc"],
      where: [["exhibiendose", "==", this.props.match.params.exhibiendose === "true"]]
    }).then((data) => {
      if (data) this.setState({ filmes: data });
    });
  }

  render() {
    let exhibiendose = this.props.match.params.exhibiendose;
    let { filmes } = this.state;

    return (
      <>
        {(exhibiendose === "true")
          ? <Separator title="🎬Películas en cartelera🎬" />
          : <Separator title="🎬Proximos estrenos🎬" />
        }
        <CardContainer cards={filmes.map(film =>
          <Card key={film.Id} url={`../filme/${film.Id}`} title={film.Titulo} img={film.Portada} text={film.Sinopsis.substr(0, 130) + "..."} />
        )} />
      </>
    );
  }
}
