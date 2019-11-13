import React from "react";
import ReactDOM from "react-dom";

import { Dashboard } from "./frame";

import { FilmeCollection, ComestibleCollection } from "./admin/";

import "bootstrap/dist/css/bootstrap.min.css";

class Relleno extends React.Component {
  render() {
    return (
      <p>Pagina Default</p>
    );
  }
}

ReactDOM.render(
  <Dashboard
    prefixedFile="/admin"
    def={Relleno}
    menu={[
      FilmeCollection,
      ComestibleCollection
    ]}
  />
  , document.getElementById('app'));
