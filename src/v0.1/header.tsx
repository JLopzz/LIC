import * as React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class Header extends React.Component<{
  menu: {
    //logo: string[]
    pages: {
      [key: string]: string[]
    }
  }
}> {
  private ulRef = React.createRef<HTMLUListElement>();

  toggle() {
    this.ulRef.current.className =
      (this.ulRef.current.className === '') ?
        'toggle' : '';
  }

  render() {
    this.toggle = this.toggle.bind(this);

    let pages = this.props.menu.pages;

    return (
      <Navbar expand="lg" className="bg-second mb-1" id="navbar">
        <Navbar.Brand href="/">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="navContent" />
        <Navbar.Collapse id="navContent">
          <Nav className="mx-auto">
            {Object.keys(pages).map(key => {
              let [route, txt] = pages[key];
              return (
                <LinkContainer key={key} to={route}>
                  <Button variant="light" className="btn-first-hover">{txt}</Button>
                </LinkContainer>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
