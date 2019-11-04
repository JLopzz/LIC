import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./header";
import Body from "./body";

import { Inicio, Cartelera, Filme } from "./pages";

let menu = {
  pages: {
    "inicio": ["/", "Inicio"],
    "exhibiendose": ["/cartelera/true", "Exhibiendose"],
    "estrenos": ["/cartelera/false", "Estrenos"]
  }
}

let pages = {
  "inicio": ["/", Inicio],
  "cartelera": ["/cartelera/:exhibiendose", Cartelera],
  "filme": ["/filme/:id", Filme]
};

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
