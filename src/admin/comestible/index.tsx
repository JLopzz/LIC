import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { MenuCollection } from "../../frame/dashboard";

import ComestibleList from "./comestibleList";
import ComestibleAdd from "./comestibleAdd";

class ComestibleContextualMenu extends React.Component {
  render() {
    let prefixedFile = "/admin/comestibles";
    return (
      <>
        <Nav.Link active>
          <LinkContainer to={`${prefixedFile}/`} exact>
            <span>List</span>
          </LinkContainer>
        </Nav.Link>
        <Nav.Link active>
          <LinkContainer to={`${prefixedFile}/add`} exact>
            <span>Add</span>
          </LinkContainer>
        </Nav.Link>
      </>
    );
  }
}

const ComestibleCollection: MenuCollection = {
  title: "Comestibles",
  mainRoute: "/comestibles/",
  contextualMenu: ComestibleContextualMenu,
  routes: {
    "/comestibles/": ComestibleList,
    "/comestibles/add": ComestibleAdd
  }
}

export default ComestibleCollection;
