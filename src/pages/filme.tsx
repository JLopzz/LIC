import React from "react";
import { Spinner, Carousel, Container } from "react-bootstrap";
import uuid from "uuid-random";

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

    let { titulo, sinopsis, trailer, portada, imagenes } = this.state;

    return (
      <>
        <Separator title={titulo} />
        <CardContainer variant="columns" id="filmeInformation" cards={[
          <Card key="portada" img={portada} flex />,
          <Card key="sinopsis" text={sinopsis} flex />,
          <Card key="score" title="Califica esta pelicula." score={this.handleScore} flex />,
          <Card key="video" video={trailer} flex />,
        ]} />
        <Separator title="Galeria de imagenes" />
        <Container>
          <Carousel>
            {imagenes.map(i =>
              <Carousel.Item>
                <img key={uuid()} className="d-block w-100" src={i} />
                <Carousel.Caption>
                  <h3>{titulo}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
        </Container>
      </>
    );
  }
}
