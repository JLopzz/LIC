import React from "react";
import Dashboard from "./dashboard";
import FilmeCollection from "./filme";
import ComestibleCollection from "./comestible";

class Relleno extends React.Component {
  render() {
    return (
      <p>Pagina Default</p>
    );
  }
}

export default class AdminV0_1 extends React.Component {
  render() {
    return (
      <Dashboard
        prefixedFile="/admin.html"
        def={Relleno}
        menu={[
          FilmeCollection,
          ComestibleCollection
        ]}
      />
    );
  }
}
