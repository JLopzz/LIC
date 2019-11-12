import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Dashboard, { DashboardProps } from "./dashboard";

import FilmList from "./views/filmViews";
import FilmAdd from "./views/filmAdd";

class Relleno extends React.Component {
  render() {
    return (<p>Esto es Relleno</p>);
  }
}

let file = "/admin.html";

let config: DashboardProps = {
  menu: [{
    title: "Filmes",
    mainRoute: file,
    actions: [
      [file, "View", FilmList],
      [`${file}/Add`, "Add", FilmAdd]
    ]
  }, {
    title: "Combos",
    mainRoute: `${file}/combos`,
    actions: [
      [`${file}/combos`, "View", Relleno]
    ]
  }]
};

export default class AdminV0_1 extends React.Component {
  render() {
    return (
      <Dashboard menu={config.menu} />
    );
  }
}
