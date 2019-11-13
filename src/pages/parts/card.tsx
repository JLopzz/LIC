import React from "react";
import { Row, Col, Card as BCard, CardGroup, CardDeck, CardColumns, ResponsiveEmbed, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ScoreStars from "./score";

import "./card.scss";

export class Card extends React.Component<{
  title?: string
  url?: string
  text?: string
  img?: string
  video?: string
  score?: (n: number) => void

  flex?: boolean
  size?: .5 | 1 | 1.5 | 2
}> {
  render() {
    let { title, text, url, img, video, score,
      flex = false,
      size = 1
    } = this.props;
    let body = title || text || video || score;

    let card =
      <BCard className="text-center">
        {(typeof img !== "string") ? void 0 : <BCard.Img variant="top" src={this.props.img} />}
        {(!body) ? void 0 :
          <BCard.Body>
            {(typeof title !== "string") ? void 0 : <BCard.Title>{title}</BCard.Title>}
            {(typeof text !== "string") ? void 0 : <BCard.Text className="text-justify">{text}</BCard.Text>}
            {(typeof video !== "string") ? void 0 :
              <ResponsiveEmbed aspectRatio="16by9" >
                <iframe src={video} frameBorder={0} allowFullScreen />
              </ResponsiveEmbed>
            }
            {!(score instanceof Function) ? void 0 : <ScoreStars setScore={score} />}
          </BCard.Body>
        }
      </BCard>;

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
  variant?: "group" | "deck" | "columns" | "fluid"
  id?: string
}> {
  render() {
    if (this.props.variant === "group")
      return <CardGroup id={this.props.id} children={this.props.cards} />;

    if (this.props.variant === "deck")
      return <CardDeck id={this.props.id} children={this.props.cards} />;

    if (this.props.variant === "columns")
      return <CardColumns id={this.props.id} children={this.props.cards} />;

    return <Row
      id={this.props.id}
      children={this.props.cards}
      className="container-fluid justify-content-center"
    />;
  }
}
