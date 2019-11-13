import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./sidebar";
import Menubar from "./menubar";
import Content from "./content";
import "./dashboard.scss";

export type MenuCollection = {
  title: string
  mainRoute: string
  contextualMenu: React.ComponentClass
  routes: {
    [route: string]: React.ComponentClass
  }
}

export default class Dashboard extends React.Component<{
  prefixedFile: string
  menu: MenuCollection[]
  def: React.ComponentClass
}, {
  sidebarToggled: boolean
}>{
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggled: true
    }

    this.toggler = this.toggler.bind(this);
  }

  toggler() {
    this.setState({ sidebarToggled: !this.state.sidebarToggled });
  }

  render() {
    let collectionRoutes = {},
      contextualMenus = {},
      pages = {};

    for (const { title, mainRoute, contextualMenu, routes } of this.props.menu) {
      collectionRoutes[mainRoute] = title;
      contextualMenus[mainRoute] = contextualMenu;
      pages = { ...pages, ...routes };
    }

    return (
      <Router>
        <div className="d-flex">
          <Sidebar
            menu={collectionRoutes}
            toggled={this.state.sidebarToggled}
            prefixedFile={this.props.prefixedFile}
          />

          <div id="content-wrapper">
            <Menubar
              contextualMenus={contextualMenus}
              toggler={this.toggler}
              prefixedFile={this.props.prefixedFile}
            />

            <div id="content">
              <Content
                pages={pages}
                def={this.props.def}
                prefixedFile={this.props.prefixedFile}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
