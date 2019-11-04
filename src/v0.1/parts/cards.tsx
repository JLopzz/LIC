import React from "react";
import { Row, Col, Card } from "react-bootstrap";

//export class CardImage extends

export default class Cards extends React.Component<{
  title: string
  text?: string
  img?: string
}> {
  render() {
    return (
      <Col sm={6} md={4} lg={3} className="mt-4">
        <Card>
          {(this.props.img == null) ? void 0 : <Card.Img variant="top" src={this.props.img} />}
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            {(this.props.text == null) ? void 0 : <Card.Text>{this.props.text}</Card.Text>}
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export class CardContainer extends React.Component<{
  Cards: React.ReactNode[]
}> {
  render() {
    return (
      <Row className="container-fluid justify-content-center">
        {this.props.Cards}
      </Row>
    );
  }
}
