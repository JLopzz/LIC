import React from "react";
import {
  Switch, Route, withRouter,
  BrowserRouter as Router
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { LinkContainer } from "react-router-bootstrap";

import {
  Container,
  ListGroup,
  Navbar, Nav,
  Button,
} from "react-bootstrap";

import uuid from "uuid-random";
import "./dashboard.scss";

type route = string;

export type DashboardProps = {
  menu: Array<{
    title: string
    mainRoute: string
    actions: Array<[route, string, React.ComponentClass]>
  }>
}

export default class Dashboard extends React.Component<DashboardProps, {
  actual: string
  sidebarToggled: boolean
}>{
  constructor(props) {
    super(props);
    this.state = {
      actual: this.props.menu[0].mainRoute,
      sidebarToggled: true
    }

    this.changeCollection = this.changeCollection.bind(this);
    this.toggler = this.toggler.bind(this);
  }

  changeCollection(route: string) {
    this.setState({ actual: route });
  }

  toggler() {
    this.setState({ sidebarToggled: !this.state.sidebarToggled });
    console.log(this.state.sidebarToggled);
  }

  render() {
    let collections = {}, actionCol = {}, pages = {};

    for (const { title, mainRoute, actions } of this.props.menu) {
      collections[mainRoute] = title;
      actionCol[mainRoute] = {};

      actions.forEach(([route, txt, component]) => {
        actionCol[mainRoute][route] = txt;
        pages[route] = component;
      });
    }

    return (
      <Router>
        <div className="d-flex">
          <Sidebar menu={collections}
            toggled={this.state.sidebarToggled}
            onChange={this.changeCollection} />

          <div id="content-wrapper">
            <Menubar collections={actionCol}
              actual={this.state.actual}
              toggler={this.toggler} />

            <div id="content">
              <RouterContainer pages={pages} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export class Sidebar extends React.Component<{
  menu: {
    [route: string]: string
  }
  toggled?: boolean
  onChange?: (route: string) => void
}> {
  handleClick(route: string) {
    if (this.props.onChange instanceof Function)
      this.props.onChange(route);
  }

  render() {
    this.handleClick = this.handleClick.bind(this);

    let toggle = (!!this.props.toggled) ? " toggled" : "";

    return (
      <div className={`bg-light border-right${toggle}`} id="sidebar">
        <div className="sidebar-heading">Cinema</div>
        <ListGroup variant="flush">
          {Object.keys(this.props.menu).map(route => {
            let txt = this.props.menu[route];

            return (
              <ListGroup.Item key={uuid()} action className="bg-light"
                onClick={() => this.handleClick(route)}
              >
                <LinkContainer to={route}>
                  <>{txt}</>
                </LinkContainer>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export class Menubar extends React.Component<{
  collections: {
    [collection: string]: {
      [route: string]: string
    }
  }
  toggler: () => void
  actual: string
}> {
  render() {
    let { collections, actual } = this.props;
    let collection: typeof collections[0] | {};

    if (collections.hasOwnProperty(actual))
      collection = collections[actual];

    return (
      <Navbar collapseOnSelect expand="lg" variant="light" bg="light" className="border-bottom">
        <Button variant="outline-dark" id="toggler"
          onClick={this.props.toggler}>&#9776; Menu</Button>

        <Navbar.Toggle aria-controls="menuBar" />
        <Navbar.Collapse id="menuBar" >
          <Nav className="ml-auto">
            {Object.keys(collection).map(route => {
              let txt = collection[route];

              return (
                <Nav.Link key={uuid()} active>
                  <LinkContainer to={route} exact>
                    <span>{txt}</span>
                  </LinkContainer>
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class Content extends React.Component<{
  location: any
  pages: {
    [key: string]: React.ComponentClass
  }
}> {
  constructor(props: any) {
    super(props);
    this.state = { selected: Object.keys(props.pages)[0] }
  }


  render() {
    let location = this.props.location;

    return (
      <TransitionGroup className="transitionWindow">
        <CSSTransition classNames="window"
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
        >
          <Container fluid>
            <Switch location={location}>
              {Object.keys(this.props.pages).map((route, i) => {
                let page = this.props.pages[route];

                if (i === 0)
                  return <Route key={uuid()} path={route} component={page} exact />;
                return <Route key={uuid()} path={route} component={page} />;
              })}
            </Switch>
          </Container>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export let RouterContainer = withRouter(Content);
