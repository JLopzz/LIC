import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { MenuCollection } from "../dashboard";

import FilmeList from "./filmeList";
import FilmeAdd from "./filmeAdd";

class FilmeContextualMenu extends React.Component {
  render() {
    let prefixedFile = "/admin.html";
    return (
      <>
        <Nav.Link active>
          <LinkContainer to={`${prefixedFile}/filmes/`} exact>
            <span>List</span>
          </LinkContainer>
        </Nav.Link>
        <Nav.Link active>
          <LinkContainer to={`${prefixedFile}/filmes/add`} exact>
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
