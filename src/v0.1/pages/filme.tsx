import React from "react";
import { Spinner } from "react-bootstrap";
import { db, store } from "../../firebase";
import { PropFilm, Film } from "../../data/filme";
import { Separator, CardContainer, Card } from "../parts";


export default class Filme extends React.Component<{
  match: {
    params: {
      id: string
    }
  }
}, { loaded: boolean } & Partial<PropFilm>> {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.Film = new Film(this.props.match.params.id);
  }

  componentDidMount() {
    db.collection("peliculas").doc(this.props.match.params.id).get()
      .then((snap) => {
        if (!snap.exists) return;

        let { titulo, sinopsis, trailer, portada } = snap.data();

        this.setState({
          loaded: true,
          titulo, sinopsis, trailer, portada
        });
      });
  }

  render() {
    if (!this.state.loaded) return <Spinner animation="border" variant="dark" />;

    let { titulo, sinopsis, trailer, portada } = this.state;

    return (
      <>
        <Separator title={titulo} />
        <CardContainer variant="column" cards={[
          <Card key={"portada"} img={store.ref(`/filmes/portada/${portada[0]}`)} flex />,
          <Card key={"sinopsis"} text={sinopsis} flex />,
          <Card key={"calificacion"} text={"Incluir califacion"} flex />,
          <Card key={"video"} video={trailer} flex />
        ]} />
      </>
    );
  }
}
