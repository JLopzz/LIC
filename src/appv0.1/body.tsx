import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Container from "react-bootstrap/Container";
import uuid from "uuid-random";

class Body extends React.Component<{
  location: any
  pages: {
    [key: string]: React.ComponentClass | string
  }
}> {
  render() {
    let location = this.props.location;

    return (
      <section className="bg-first">
        <TransitionGroup className="transitionWindow">
          <CSSTransition key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="window"
          >
            <Container fluid={true} id="container">
              <Switch location={location}>
                {Object.keys(this.props.pages).map((route, i) => {
                  let page = this.props.pages[route];

                  if (typeof page === "string")
                    return <Redirect key={uuid()} from={route} to={page} />;

                  if (i === 0)
                    return <Route key={uuid()} path={route} component={page} exact />;
                  return <Route key={uuid()} path={route} component={page} />;
                })}
              </Switch>
            </Container>
          </CSSTransition>
        </TransitionGroup>
      </section>
    );
  }
}

export default withRouter(Body);
