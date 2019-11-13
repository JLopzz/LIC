import * as React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import uuid from "uuid-random";

export default class Header extends React.Component<{
  menu: {
    [key: string]: string
  }
}> {
  render() {
    return (
      <Navbar expand="lg" className="bg-second mb-1" id="navbar">
        <Navbar.Brand href="/">
          <img src="../resources/logo.png" alt="Forever Cinema"
            width="57" height="50" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navContent" />
        <Navbar.Collapse id="navContent">
          <Nav className="mx-auto">
            {Object.keys(this.props.menu).map(route => {
              let txt = this.props.menu[route];

              return (
                <LinkContainer key={uuid()} to={route} exact>
                  <Button className="btn-first-hover" variant="light">{txt}</Button>
                </LinkContainer>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
