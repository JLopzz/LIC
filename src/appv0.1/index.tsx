import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./header";
import Body from "./body";

import { Inicio, Cartelera, Filme, About } from "./pages";

let menu = {
  "/": "Inicio",
  "/cartelera/true": "Exhibiendose",
  "/cartelera/false": "Estrenos",
  "/about": "Sobre Nosotros"
}

let pages = {
  "/": Inicio,
  "/admin": "admin.html",
  "/cartelera/:exhibiendose": Cartelera,
  "/filme/:id": Filme,
  "/about": About
}

export default class AppV0_1 extends React.Component {
  render() {
    return (
      <Router>
        <>
          <Header menu={menu} />
          <Body pages={pages} />
        </>
      </Router>
    );
  }
}
