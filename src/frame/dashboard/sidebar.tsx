import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup, Navbar } from "react-bootstrap";
import uuid from "uuid-random";

export default class Sidebar extends React.Component<{
  menu: {
    [route: string]: string
  }
  prefixedFile: string
  toggled?: boolean
}> {
  render() {
    let { menu, prefixedFile } = this.props;
    let toggle = (!!this.props.toggled) ? " toggled" : "";

    return (
      <div className={`bg-light border-right${toggle}`} id="sidebar">
        <div className="list-group list-group-flush sidebar-heading p-0">
          <LinkContainer to={prefixedFile} exact>
            <ListGroup.Item action className="bg-light text-dark">
              Cinema
            </ListGroup.Item>
          </LinkContainer>
        </div>
        <ListGroup variant="flush">
          {Object.keys(menu).map(route => {
            let txt = menu[route];

            return (
              <LinkContainer key={uuid()} to={`${prefixedFile}${route}`} exact >
                <ListGroup.Item action className="bg-light text-dark">
                  {txt}
                </ListGroup.Item>
              </LinkContainer>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
