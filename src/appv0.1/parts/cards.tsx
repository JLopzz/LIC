import firebase from "firebase";
import React from "react";
import { Row, Col, Card, CardGroup, CardDeck, CardColumns, ResponsiveEmbed } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ScoreStars from "./score";

//import "./cards.css";

export default class Cards extends React.Component<{
  title?: string
  url?: string
  text?: string
  img?: firebase.storage.Reference
  video?: string
  score?: (n: number) => void

  flex?: boolean
  size?: .5 | 1 | 1.5 | 2
}, {
  img: string
}> {
  constructor(props) {
    super(props);
    this.state = { img: "#" };
  }

  componentDidMount() {
    if (!this.props.img || !this.props.img.getDownloadURL) return;
    this.props.img.getDownloadURL()
      .then(url => this.setState({ img: url.toString() }));
  }

  render() {
    let { title, text, url, img, video, score,
      flex = false, size = 1
    } = this.props;
    let body = title || text || video || score;

    let card =
      <Card className="text-center">
        {(img == null) ? void 0 : <Card.Img variant="top" src={this.state.img} />}
        {(!body) ? void 0 :
          <Card.Body>
            {(typeof title !== "string") ? void 0 : <Card.Title>{title}</Card.Title>}
            {(typeof text !== "string") ? void 0 : <Card.Text className="text-justify">{text}</Card.Text>}
            {(typeof video !== "string") ? void 0 :
              <ResponsiveEmbed aspectRatio="16by9" >
                <iframe src={video} frameBorder={0} allowFullScreen />
              </ResponsiveEmbed>
            }
            {!(score instanceof Function) ? void 0 : <ScoreStars setScore={score} />}
          </Card.Body>
        }
      </Card>;

    if (flex === true && typeof url === "string")
      return <LinkContainer to={url} children={card} />
    if (flex === true) return card;

    let small = 6 * size,
      medium = 4 * size,
      large = Math.ceil(3 * size);

    return (
      <Col sm={small} md={medium} xl={large} className="mt-4">
        {(typeof url !== "string")
          ? card : <LinkContainer to={url} children={card} />
        }
      </Col>
    );
  }
}

export class CardContainer extends React.Component<{
  cards: React.ReactNode[]
  variant?: "group" | "deck" | "column" | "fluid"
}> {
  render() {
    if (this.props.variant === "group")
      return <CardGroup children={this.props.cards} />;

    if (this.props.variant === "deck")
      return <CardDeck children={this.props.cards} />;

    if (this.props.variant === "column")
      return <CardColumns children={this.props.cards} />;

    return <Row children={this.props.cards}
      className="container-fluid justify-content-center" />;
  }
}