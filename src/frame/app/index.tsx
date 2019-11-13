import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Body from "./body";
import Header from "./header";

export default class App extends React.Component<{
  def: React.ComponentClass
  menu: {
    [route: string]: string
  }
  pages: {
    [route: string]: React.ComponentClass
  }
}> {
  render() {
    return (
      <Router>
        <>
          <Header menu={this.props.menu} />
          <Body
            def={this.props.def}
            pages={this.props.pages}
          />
        </>
      </Router>
    );
  }
}
