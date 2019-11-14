import React from "react";
import { Navbar, ListGroup, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import uuid from "uuid-random";

import { CardContainer } from "../../pages/parts/card";

export default class Footer extends React.Component<{
  menu: {
    [route: string]: string
  }
}> {
  render() {
    let { menu } = this.props;

    return (
      <Container fluid id="footer" className="bg-second">
        <Row className="h-100">
          <Col md="2" className="my-auto text-center">
            <Navbar.Brand key="logo" href="/">
              <img src="../resources/logo.png" alt="Forever Cinema"
                width="80" height="65" />
            </Navbar.Brand>
          </Col>
          <Col md="8">
            <ListGroup variant="flush" id="footer-list" >
              {Object.keys(menu).map(route =>
                <LinkContainer key={uuid()} to={route} exact>
                  <ListGroup.Item
                    className="bg-second text-dark p-1"
                  >{menu[route]}</ListGroup.Item>
                </LinkContainer>
              )}
            </ListGroup>
          </Col>
          <Col md="2" className="my-auto text-center">
            <p className="d-block my-auto">Derechos reservados &copy;<br />2019</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
