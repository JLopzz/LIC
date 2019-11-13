import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { MenuCollection } from "../../frame/dashboard";

import FilmeList from "./filmeList";
import FilmeAdd from "./filmeAdd";

class FilmeContextualMenu extends React.Component {
  render() {
    let prefixedFile = "/admin/filmes";
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

const FilmeCollection: MenuCollection = {
  title: "Filmes",
  mainRoute: "/filmes/",
  contextualMenu: FilmeContextualMenu,
  routes: {
    "/filmes/": FilmeList,
    "/filmes/add": FilmeAdd
  }
}

export default FilmeCollection;
