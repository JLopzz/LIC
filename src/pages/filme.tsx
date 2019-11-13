import React from "react";
import { Spinner } from "react-bootstrap";
import { Filme, FilmeProps } from "../data";
import { Separator, CardContainer, Card } from "./parts";

export default class FilmePage extends React.Component<{
  match: {
    params: {
      id: string
    }
  }
}, {
  score: number
  loaded: boolean
} & Partial<FilmeProps>> {
  private Filme: Filme;

  constructor(props) {
    super(props);
    this.state = { score: 0, loaded: false };
    this.Filme = new Filme(this.props.match.params.id);
    this.handleScore = this.handleScore.bind(this);
  }

  handleScore(n: number) {
    this.setState({ score: n });
  }

  componentDidMount() {
    this.Filme.get()
      .then(f => {
        if (!!f) this.setState({
          titulo: f.titulo,
          estreno: f.estreno,
          exhibiendose: f.exhibiendose,
          sinopsis: f.sinopsis,
          trailer: f.trailer,
          portada: f.portada,
          imagenes: f.imagenes,

          loaded: true
        });
      })
  }

  render() {
    if (!this.state.loaded) return <Spinner animation="border" variant="dark" />;

    let { titulo, sinopsis, trailer, portada } = this.state;

    return (
      <>
        <Separator title={titulo} />
        <CardContainer variant="columns" id="filmeInformation" cards={[
          <Card key="portada" img={portada} flex />,
          <Card key="sinopsis" text={sinopsis} flex />,
          <Card key="score" title="Califica esta pelicula." score={this.handleScore} flex />,
          <Card key="video" video={trailer} flex />,
        ]} />
      </>
    );
  }
}
