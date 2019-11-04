import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./header";
import Body from "./body";

import { Inicio } from "./pages";
import Dulceria from "./dulceria";

let menu = {
  pages: {
    "inicio": ["/", "Inicio"]
  }
}

let pages = {
  "inicio": ["/", Inicio]
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
