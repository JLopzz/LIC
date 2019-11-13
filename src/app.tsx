import React from "react";
import ReactDOM from "react-dom";

import { App } from "./frame";
import {
  Home,
  Dulceria,
  Cartelera,
  Filme,
  About
} from "./pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "./frame/app/index.scss";
import "./pages/index.scss";

ReactDOM.render(
  <App
    def={Home}
    menu={{
      "/": "Inicio",
      "/dulceria": "Dulceria",
      "/cartelera/true": "Exhibiendose",
      "/cartelera/false": "Estrenos",
      "/about": "Sobre Nosotros"
    }}
    pages={{
      "/": Home,
      "/dulceria": Dulceria,
      "/cartelera/:exhibiendose": Cartelera,
      "/filme/:id": Filme,
      "/about": About
    }}
  />
  , document.getElementById('app'));
