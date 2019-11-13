import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import uuid from "uuid-random";

class Menubar extends React.Component<{
  location: any
  prefixedFile: string
  contextualMenus: {
    [collectionRoute: string]: React.ComponentClass
  }
  toggler: () => void
}> {
  render() {
    let { location, prefixedFile, contextualMenus } = this.props;

    return (
      <Navbar collapseOnSelect expand="lg" variant="light" bg="light" className="border-bottom">
        <Button variant="outline-dark" id="toggler"
          onClick={this.props.toggler}>&#9776; Menu</Button>

        <Navbar.Toggle aria-controls="menuBar" />
        <Navbar.Collapse id="menuBar" >
          <Nav className="ml-auto">
            <Switch location={location}>
              {Object.keys(contextualMenus).map((collectionRoute, i) => {
                let contextualMenu = contextualMenus[collectionRoute];

                return <Route
                  key={uuid()}
                  path={`${prefixedFile}${collectionRoute}`}
                  component={contextualMenu}
                />;
              })}
            </Switch>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Menubar);
